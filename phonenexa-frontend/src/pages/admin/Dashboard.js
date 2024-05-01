import styled from "styled-components";
import Topbar from "components/admin/Topbar";
import Sidebar from "components/admin/Sidebar";
import Home from "./Home";

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
                <Home />
            </Container>
        </>
    );
}

export default App;
