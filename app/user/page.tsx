import { auth, currentUser } from "@clerk/nextjs/server";

export default async function UserPage() {
    // Get the userId from auth() -- if null, the user is not signed in
    const obje = auth();
    const user = await currentUser();

    return (
        <div>
            <h1>User ID: {obje.userId}</h1>
            <h2>User Object:</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <h2>Auth Object:</h2>
            <pre>{JSON.stringify(obje, null, 2)}</pre>
        </div>
    );
}
