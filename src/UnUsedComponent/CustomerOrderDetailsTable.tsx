export default function CustomerOrderDetailsTable() {

    return (
        <div className="table-main">
            {/* <div className="table-name">Order Details</div> */}
            <table className="table">
                <thead className='thead'>
                    <tr>
                        <th className="hvalue">Name</th>
                        <th className="hvalue">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='trow'>
                        <td className="rheading">Contract Signing</td>
                        <td className="rvalue">Yet to Start</td>
                    </tr>
                    <tr className='trow'>
                        <td className="rheading">Equipment Delivery</td>
                        <td className="rvalue">
                            <ol className='list-decimal space-y-[1vh]'>
                                <li>
                                    Order Packed<br />
                                    <span className='text-primary-200 text-1xl'>Yet to start</span> 
                                </li>
                                <li>
                                    Order Dispatched<br />
                                    <span className='text-primary-200 text-1xl'>Yet to start</span> 
                                </li>
                                <li>
                                    In Transit<br />
                                    <span className='text-primary-200 text-1xl'>Yet to start</span> 
                                </li>
                            </ol>
                        </td>
                    </tr>
                    <tr className='trow'>
                        <td className="rheading">Construction Stage</td>
                        <td className="rvalue">
                            <ol className='list-decimal space-y-[1vh]'>
                                <li>
                                    Installer Assigned<br />
                                    <span className='text-primary-200 text-1xl'>Yet to start</span> 
                                </li>
                                <li>
                                    Civil Work Started<br />
                                    <span className='text-primary-200 text-1xl'>Yet to start</span> 
                                </li>
                            </ol>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
