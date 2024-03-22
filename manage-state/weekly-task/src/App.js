import './App.css';
import {useEffect, useState} from "react";
import {Button, Checkbox, Spin, Typography} from 'antd';
import DataTable from "./component/DataTable";
const { Title } = Typography;
// import {createStandaloneToast} from "@chakra-ui/toast";

// const { toast } = createStandaloneToast();

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  //
  // // useEffect(() => {
  // //   manageStateData();
  // // }, []);
  //
  // const manageStateData = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 4000));
  //
  //     setIsLoading(true);
  //
  //     await new Promise((resolve) => setTimeout(resolve, 4000));
  //
  //     // For demonstration purposes, throwing an error to simulate API failure
  //     throw new Error('Parameter is not a number!');
  //   } catch (e) {
  //     console.error(e); // Temporary log for error
  //     // Code to show the error here
  //   } finally {
  //     // Set loading state back to false regardless of success or failure
  //     setIsLoading(false);
  //   }
  // };

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [transactionOpen, setTransactionOpen] = useState(false);
    const [isTransactionDataLoading, setIsTransactionDataLoading] =
        useState(true);

    const [clicked, setClicked] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsTransactionDataLoading(true);
    //             const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }
    //             const json = await response.json();
    //             setData(json);
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setIsLoading(false);
    //             setIsTransactionDataLoading(false);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    const handleClick = () => {
        setClicked(!clicked);
    };
    console.log('Button Click =>', clicked);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 4000));
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data when the component mounts
    const handleClickCallAPI = () => {
        fetchData();
    };

    const handleInvoiceCheckbox = (value) => {
        if (value) {
            setTransactionOpen(true);
            setIsTransactionDataLoading(false);
        } else {
            setTransactionOpen(false);
        }
    };

  return (
      <div className="App">
          <h1>I Manage State For using Antd library.</h1>
          {/*<div>*/}
          {/*    <h1>Data from API:</h1>*/}
          {/*    <pre>{JSON.stringify(data, null, 2)}</pre>*/}
          {/*</div>*/}

          <div>
              <Button type="primary" onClick={handleClickCallAPI}>Call API</Button>
              {isLoading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {data && (
                  <div>
                      <h1>Data from API:</h1>
                      <pre>{JSON.stringify(data, null, 2)}</pre>
                  </div>
              )}
          </div>

          <Button type="primary" onClick={handleClick}>Click Me</Button>
          <div className='component'>
              <Checkbox
                  size="md"
                  isDisabled={isTransactionDataLoading}
                  onChange={(event) => {
                      handleInvoiceCheckbox(event.target.checked);
                  }}
              >
                  Include Transaction Fees
              </Checkbox>
              {/*{isTransactionDataLoading && (*/}
              <Spin size="small" alignItems={'center'}/>
              {/*)}*/}
              {transactionOpen && (
                  <>
                      <Title
                          fontWeight={700}
                          fontSize="18px"
                          color="#333"
                          pl={'10px'}
                          m={2}
                      >
                          Available Transaction Fees
                      </Title>
                      <DataTable/>
                  </>
              )}
          </div>
      </div>
  );
}

export default App;
