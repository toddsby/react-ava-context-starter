import React from 'react';
import HttpService from '../../services/http';
import MockAPI from '../../services/mock-api';
import './test-styles.scss';

function Test() {
  // useState to store swapi people response
  const [people, setPeople] = React.useState([]);
  const [settings, setSettings] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  React.useEffect(() => {
    // useEffect async / await example usage
    // ref: https://stackoverflow.com/a/56838577
    const getJobs = async () => {
      let mockJobs = await MockAPI.getJobs();
      setJobs(mockJobs);
    }
    getJobs();
    HttpService.getConfig().then(settingsResponse => {
      setSettings(settingsResponse);
    });
    HttpService.get('people',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(peopleResponse => {
        setPeople(peopleResponse.response.results);
      });
  }, []);

  function _handleClick(evt) {
    console.log('evt.target.innerText', evt.target.innerText);
  }

  console.log('current Jobs', jobs[0]);

  let characters = people.map((person,idx)=> {
    let id = `show-${person.name.toLowerCase()}`;
    let key = `${person.name}-${idx}-menu-item`;
    return (
      <li key={key} id={id} className="menu-item" onClick={_handleClick}>{person.name}</li>
    );
  });

  let currentSettings = Object.keys(settings).map((setting,idx)=> {
    let id = `show-${setting.toLowerCase()}`;
    let key = `${setting}-${idx}-menu-item`;
    let content = `${setting}: ${settings[setting]}`;
    return (
      <li key={key} id={id} className="menu-item" onClick={_handleClick}>{content}</li>
    );
  });

  return (
      <main className="jngl__test">
        <section className="jngl__mast">
          <h1>jngl test</h1>
          <h2>developer experiments</h2>
        </section>
        <section className="jngl__people">
          <h2>Characters</h2>
          <ul>
            {characters}
          </ul>
          <h2>Settings</h2>
          <ul>
            {currentSettings}
          </ul>
        </section>
      </main>
  );
}

export default Test;
