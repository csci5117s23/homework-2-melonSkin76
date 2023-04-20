import Link from "next/link";

export default function My404(){
    return(
        <>
            <div>
                <h1>404 Not Found</h1>
                <Link href='/todo'>Go Back to Todo</Link>
            </div>
        </>
    );
}