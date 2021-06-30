import Head from 'next/head';
import { table, minifyRecords } from './api/utils/airtable';
import Todo from '../compenents/Todo';
import { useEffect, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../compenents/TodoForm';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home({ initialTodos }) {
    const { todos, setTodos } = useContext(TodosContext);
    const { user, error, isLoading } = useUser();

    useEffect(() => console.log(user), [user])

    useEffect(() => {
        setTodos(initialTodos);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="max-w-xl m-auto p-2">
            <Head>
                <title>My Todo CRUD App</title>
            </Head>

            <main>
                <nav>
                    <div className="flex items-center justify-between py-4  ">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold text-gray-800 md:text-3xl">
                                <a href="#">My Todos</a>
                            </div>
                        </div>
                        <div className="flex">
                            {user ? (
                                <a
                                    href="/api/auth/logout"
                                    className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                                >
                                    Logout
                                </a>
                            ) : (
                                <a
                                    href="/api/auth/login"
                                    className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                                >
                                    Login
                                </a>
                            )}
                        </div>
                    </div>
                </nav>
                {user ? (
                    <>
                        <TodoForm />
                        <ul>
                            {todos &&
                                todos.map((todo) => (
                                    <Todo todo={todo} key={todo.id} />
                                ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-center mt-4">
                        Please login to save todos!
                    </p>
                )}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    //TODO: Get the logged in user
    //TODO: only get records for logged in user
    const todos = await table.select().firstPage();
    return {
        props: {
            initialTodos: minifyRecords(todos),
            user: null,
        },
    };
}
