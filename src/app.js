import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('email-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const value = Object.fromEntries(data.entries());

    API.post('users', '/users', {headers: {}, body: {
      pk: value.wallet_id, 
      sk: 'user-info',
      email: value.email
    }}).then((res) => {
      alert("Wallet has been attached with an email!")
    })
  })

  document.getElementById('shipping-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const value = Object.fromEntries(data.entries())
    let wallet_id = value.wallet
    delete value.wallet
    API.post('users', '/users', {headers: {}, body: {
      pk:   wallet_id, 
      sk:   'shipping-info', 
      ...value
    }}).then(() => {
      alert("Shipping info added!")
    })
  })


  document.getElementById('fetch-user').addEventListener('click', (ev) => {
    ev.preventDefault();
    let field = document.getElementById('fetch-wallet-field')
    let sk = document.getElementById('sk-field')
    API.get('users', `/users/object/${field.value}/${sk.value}`, {headers: {}}).then((res) => {
      document.getElementById('fetch-display').innerHTML = JSON.stringify(res)
    })
  })

})