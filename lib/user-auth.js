// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "@/lib/db";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import Judge from "@/model/judge";

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID_USER,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET_USER,
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID_USER,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET_USER,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {
        label:"Email" , type:"text",
      }, password: {
        label:"Password" ,type : "password"
      } },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("missing email , password  credentials")
        }
        try {
            await connectDb();
            let user = await User.findOne({ email: credentials.email });
            let role = "User";
            if (!user){
              user = await Judge.findOne({email:credentials.email})
              role = "Judge";
            }

            if (!user){
              user = await Clerk.findOne({email:credentials.email})
              role = "Judge";
            }
            if(!user)throw new Error("User not found");
    
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) throw new Error("Invalid credentials");
    
            return { id: user._id.toString(), email: user.email, role };
          } catch (error) {
            console.log(error);
            return null
          }
       
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(token,"first");
      console.log(user,"1 user");
      if (user){
        token.id = user.id;
          // token.accessToken = account.access_token;
          token.role = user.role;
          console.log(token,"2 token")
        } 
        return token;
    },
    async session({ session, token }) {
      console.log(token,"3 token");
      session.user.role = token.role;
      if (!session.user) { 
        session.user.id = token.id;
        session.id = token.id;
        console.log(session,'1 session');
      }
      return session;
    },
  },
  pages:{
    signIn:'/user-login',
    error:'/user-login',
  },
  session: { 
    strategy: "jwt",
    maxAge:30*24*60*60
   },
   secret: process.env.NEXTAUTH_SECRET
}
