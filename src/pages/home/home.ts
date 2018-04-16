import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros;

  constructor(public navCtrl: NavController, private _http: HttpClient, private _loading: LoadingController, private _alert: AlertController, 
  
  private _carrosService: CarrosServiceProvider) {

    let loading = this._loading.create({
      content: "Aguarde o carregamento..."
    })

    loading.present();

    this._carrosService.lista().subscribe(
      (carros) => {
        this.carros = carros;

        loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        loading.dismiss();

        this._alert.create({
          title: "Falha na conexão!",
          subTitle: "Não foi possível carregar o aplicativo, tente novamente mais tarde!",
          buttons: [
            {
            text: "Ok"}
          ]
        }).present();

      } 
    )

  }

}
