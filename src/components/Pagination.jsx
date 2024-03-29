/** @format */

const Pagination = ({ page, maxPage, setPage }) => {
  const handlePrevPage = () => {
    setPage((p) => (p === 1 ? 1 : p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => (p === maxPage ? maxPage : p + 1));
  };
  return (
    <div className="paginate">
      <button disabled={page === 1} onClick={handlePrevPage}>
        Previous
      </button>
      <button>{page}</button>
      <button disabled={maxPage === page} onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};
export default Pagination;
