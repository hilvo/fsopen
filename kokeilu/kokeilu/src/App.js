import logo from './logo.svg';
import './App.css';
import LineTo from 'react-lineto'

function App() {
  return (
    <div class="container">
      <div>

      <h1>Tervetuloa SmartumAdsiin!<br/><br/></h1>

      <h3>Mainosta palveluasi tehokkaasti SmartumPay applikaatiossa.<br/> Kampanjan luominen on helppoa:</h3>

      <div className = "firstParagraph"><p>Luo mainos helposti tarjoamistamme laadukkaista kuvista.
        Voit liittää mainokseesi URL-osoitteen esimerkiksi omille kotisivuillesi.</p>
      </div>

      <div className = "secondParagraph">
        <p>Voit osoittaa kampanjan <b>usealle eri toimipisteelle,</b> jolloin mainoksessa näytettävän
        toimipisteen tiedot valikoituat käyttäjän sijainnin perusteella.</p>
      </div>


      <p>Valitse kampanjan kesto. <b>Yksi viikko maksaa 20 €.</b>
       Maksa kampanjasi helposti Paytrailin avulla.</p>

       </div>

       <div className = "figure">
         <img src={require('./smartumPayExample.png')} alt = 'smartumPay'/>
       </div>

       <LineTo from = "firstParagraph" to = "figure"/>
       <LineTo from = "secondParagraph" to = "figure"/>
      </div>
  );
}

export default App;
