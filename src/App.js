import React from 'react';
import { Cards, Chart, CountryPicker, Loading } from './components/index'
import styles from './App.module.css';
import { fetchData } from './api/index';
import coronaImage from './images/image.png'

class App extends React.Component {
  state = {
    data: {},
    country: '',
    loading: false
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    this.setState({ loading: true })
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country, loading: false })
  }

  render() {
    const { data, country, loading } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='covid-19' />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        {loading && <Loading />}
      </div>
    )
  }
}

export default App;