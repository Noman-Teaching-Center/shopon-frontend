import { useEffect, useState } from "react";
import axios from "axios";
import getColumns from "./admin.table.columns";
import Table from "../../../core/components/table.component";
import Pagination from "../../../core/components/pagination.component";
import _ from "lodash";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [sortColumn, setSortColumn] = useState({
        path: "profile_id",
        order: "asc",
    });

    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(3);

    const columns = getColumns();

    const handleSort = (sortColumn) => setSortColumn(sortColumn);

    const sortUsers = (users) => {
        const sortedUsers = _.orderBy(
            users,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedUsers;
    };

    const handleClickPage = (activePage) => setActivePage(activePage);

    const paginateUsers = () => {
        const start = (activePage - 1) * pageCount;
        const paginatedUsers = users.slice(start, start + pageCount);
        return paginatedUsers;
    };

    async function getUsers() {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/users",
                { withCredentials: "true" }
            );
            setUsers(data);
        } catch {
            console.log("error while getting users");
        }
    }

    const paginatedUsers = paginateUsers();
    const userList = sortUsers(paginatedUsers);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <Link
                    to="/platform/users/create"
                    className="btn btn-primary m-2"
                >
                    Creat A new User{" "}
                </Link>
            </div>

            <Table
                users={userList}
                columns={columns}
                sortColumns={sortColumn}
                onSort={handleSort}
            />
            <Pagination
                totalUsers={users.length}
                pageCount={pageCount}
                activePage={activePage}
                onClickPage={handleClickPage}
            />
        </div>
    );
};

export default Users;
