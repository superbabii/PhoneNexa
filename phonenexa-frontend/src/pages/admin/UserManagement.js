import styled from "styled-components";
// import tw from "twin.macro";
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Topbar from "components/admin/Topbar";
import Sidebar from "components/admin/Sidebar";
import UserList from "./UserList";
import { userRows } from "./dummyData";

export const Container = styled.div`
    display: flex;
    margin-top: 110px;
    padding: "10px";
`;

function App() {
    return (
        <>
            <Topbar/>
            <Container>
                <Sidebar />
                <UserList data={userRows} />
            </Container>
        </>
    );
}

export default App;
