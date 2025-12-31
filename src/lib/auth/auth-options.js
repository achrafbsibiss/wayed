import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password');
                }

                try {
                    // Get user from Supabase
                    const { data: user, error } = await supabaseAdmin
                        .from('users')
                        .select('*')
                        .eq('email', credentials.email)
                        .single();

                    if (error || !user) {
                        throw new Error('Invalid email or password');
                    }

                    // Check if password is hashed (starts with $2a$ or $2b$ for bcrypt)
                    const isPasswordHashed = user.password_hash.startsWith('$2');

                    let isPasswordValid = false;

                    if (isPasswordHashed) {
                        // Compare hashed password
                        isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);
                    } else {
                        // For initial setup - compare plain text (temporary)
                        isPasswordValid = credentials.password === user.password_hash;

                        // Auto-update to hashed password
                        if (isPasswordValid) {
                            const hashedPassword = await bcrypt.hash(credentials.password, 10);
                            await supabaseAdmin
                                .from('users')
                                .update({ password_hash: hashedPassword })
                                .eq('id', user.id);
                        }
                    }

                    if (!isPasswordValid) {
                        throw new Error('Invalid email or password');
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.AUTH_SECRET,
};
