import { auth, currentUser } from "@clerk/nextjs/server";

export default async function UserPage() {
    // Get the userId from auth() -- if null, the user is not signed in
    const { userId } = auth();

    return (
        <div>
            <h1>User ID: {userId}</h1>
        </div>
    );
}
