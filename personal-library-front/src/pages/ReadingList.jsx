import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { ToasterContext } from '../contexts/ToasterContext';

const bookStatus = ['read', 'pending', 'lend', 'not read', 'lost', 'on wishlist'];

const ReadingList = () => {
  const { user } = useContext(AuthContext);
  const { toaster } = useContext(ToasterContext);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(res.msg);
        setBooks(data.data.readingList);
      } catch {
        toaster.error('Failed to get your Reading List');
      }
    };

    fetchReadingList();
  }, [user, toaster]);

  const handleChange = async (e, bookId, title) => {
    const newStatus = e.target.value;
    const updatedBooks = books.map((book) => (book.bookRefId._id === bookId ? { ...book, status: newStatus } : book));
    setBooks(updatedBooks);

    try {
      // const token = localStorage.getItem('token');
      // console.log({ token });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}/books/${bookId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg);
      toaster.success(`Changed ${title} to ${newStatus}`);
    } catch {
      setBooks(books);
      toaster.error(`Failed to change ${title} to ${newStatus}`);
    }
  };

  return (
    <>
      <h1>ReadingList</h1>
      {books &&
        books.map((book) => {
          const { title, author, description, _id } = book.bookRefId;
          const statuses = bookStatus.filter((s) => s !== book.status);
          return (
            <div key={book._id} className='card card-dash bg-base-100 w-96'>
              <div className='card-body'>
                <h2 className='card-title'>{title}</h2>
                <p>{author}</p>
                <p>{description}</p>
                <div className='card-actions justify-end'>
                  <select
                    value={book.status}
                    className='select select-accent capitalize'
                    onChange={(e) => handleChange(e, _id, title)}
                  >
                    <option disabled={true}>{book.status}</option>
                    {statuses.map((s) => (
                      <option key={book._id + s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ReadingList;
