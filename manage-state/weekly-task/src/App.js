import './App.css';
import {useEffect, useState} from "react";
import {Button, Checkbox, Spin, Typography} from 'antd';
import DataTable from "./component/DataTable";
const { Title } = Typography;

function App() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [informationOpen, setInformationOpen] = useState(false);
    const [isDeveloperDataLoading, setIsDeveloperDataLoading] =
        useState(true);

    const [clicked, setClicked] = useState(true);

    const handleClick = () => {
        setClicked(!clicked);
    };
    console.log('Button Click =>', clicked);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            setIsDeveloperDataLoading(true);
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
            setIsDeveloperDataLoading(false);
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
            setInformationOpen(true);
            setIsDeveloperDataLoading(false);
        } else {
            setInformationOpen(false);
        }
    };

  return (
      <div className="App">
          <h1 style={{fontFamily: 'serif'}}>I manage state for using ReactJs, Antd library.</h1>

          <div className={'api-component'}>
              <Button className="button" type="primary" onClick={handleClickCallAPI}>Call API</Button>
                  {isDeveloperDataLoading && (
                  <Spin tip="Loading" size="large" alignItems={'center'}/>
              )}

              {isLoading && <div style={{ padding: '10px'}}>Loading...</div>}
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
                  onChange={(event) => {
                      handleInvoiceCheckbox(event.target.checked);
                  }}
              >
                  Include Developer Information
              </Checkbox>
              {informationOpen && (
                  <>
                      <Title
                          fontWeight={700}
                          fontSize="18px"
                          color="#333"
                          pl={'10px'}
                          m={2}
                      >
                          Available Developer Information
                      </Title>
                      <DataTable/>
                  </>
              )}
          </div>
      </div>
  );
}

export default App;
