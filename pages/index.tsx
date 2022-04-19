import Link from 'next/link';
import Button from '@mui/material/Button';
// import styled from "styled-components";
// import dynamic from "next/dynamic";

// const BgImage = dynamic(() => import("../src/components/BGImage"), {
//   ssr: false,
// });

// const Wrapper = styled.div`
//   z-index: 1;
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   justify-content: center;
//   align-items: center;
//   display: flex;
// `;

function HomePage() {
  return (
    // <>
    //   <Wrapper>
    <div>
      <ul>
        <li>
          <Button href="/portal/dashboard">DashBoard Page</Button>
        </li>
        <li>
          <Button href="/portal/management">Management Page</Button>
        </li>
        <li>
          <Button href="/portal/cards">Apartment Info Page</Button>
        </li>
        <li>
          <Button href="/portal/operations">Space and Property Management</Button>
        </li>        
      </ul>
    </div>
    //   {/* </Wrapper> */}

    //   {/* <BgImage /> */}
    // </>

  );
}

export default HomePage;