import { ProductProvider } from "../contexts/productContext";
import UsersList from "./users/UsersList";

const usersListPage: React.FunctionComponent<{}> = () => {
    return ( 
        <ProductProvider>
            <UsersList />
        </ProductProvider>
    )
}

export default usersListPage;