// // pages/api/signup.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcrypt';
// import { z } from 'zod';

// // Dummy user storage (Replace with actual storage mechanism)
// const users: Array<{ name: string; email: string; password: string }> = [];

// const userSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(6, 'Password must be at least 6 characters long'),
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       // Validate request body
//       const parsed = userSchema.safeParse(req.body);
//       if (!parsed.success) {
//         res.status(400).json({ message: parsed.error.issues.map(issue => issue.message).join(', ') });
//         return;
//       }

//       const { name, email, password } = parsed.data;

//       // Check if the user already exists
//       const existingUser = users.find(user => user.email === email);
//       if (existingUser) {
//         res.status(400).json({ message: 'User already exists' });
//         return;
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create the new user
//       users.push({ name, email, password: hashedPassword });

//       // Respond with a success message
//       res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
