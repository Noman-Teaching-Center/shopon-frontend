import React from "react";

import TableBody from "./table-body.component";
import TableHeader from "./table-header.component";

const Table = (props) => {
    const { items, columns, sorters, onSort } = props;

    return (
        <>
        <div className="border border-success my-5">

            <table className="table table-hover">
                <TableHeader
                    columns={columns}
                    sorters={sorters}
                    onSort={onSort}
                />
                <TableBody items={items} columns={columns} />
            </table>
        </div>
        </>
    );
};

export default Table;
