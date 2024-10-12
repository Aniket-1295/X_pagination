import { useState, useEffect } from "react";
import axios from 'axios';
import Navigation from "./Navigation";

const TableData = () => {

    const [apiData,setApiData] = useState();

    const fetchUrl = async() => {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        return response;
    }

    const [pageNum, setPageNum] = useState(1);
    const recordPerPage = 10;
    const firstIndex = pageNum*recordPerPage-recordPerPage;
    const lastIndex = pageNum*recordPerPage;

    useEffect(()=>{
        fetchUrl()
        .then(res => {
            setApiData(res.data);
        })
        .catch(err => alert("failed to fetch data"));
    },[]);

    const handleIncrement = () => {
        if(Math.ceil(apiData?.length/recordPerPage) >= ((pageNum+1))){
            setPageNum(prev => prev+1);
        }
        // console.log(apiData.length)
    }

    const handleDecrement = () => {
        if(pageNum>1){
            setPageNum(prev => prev-1)
        }
    }


    return ( 
        <div className="table-and-pagination">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData?.slice(firstIndex,lastIndex)
                    .map((item) => (<tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>))
                    }
                </tbody>
            </table>
            <Navigation pageNum={pageNum} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>
        </div>
     );
}
 
export default TableData;