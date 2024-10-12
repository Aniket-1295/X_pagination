const Navigation = ({pageNum,handleDecrement,handleIncrement}) => {
    return ( 
        <div className='navigations'>
            <button className='prev-btn' onClick={handleDecrement}>
                Previous
            </button>
            <p className='page-num'>{pageNum}</p>
            <button className='next-btn' onClick={handleIncrement}>
                Next
            </button>
        </div>
     );
}

export default Navigation;