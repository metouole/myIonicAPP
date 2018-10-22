import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { InsertPage } from '../insert/insert';
import { CrudProvider } from '../../providers/crud/crud';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mydata: any

  constructor(public navCtrl: NavController,
  public crudProvider: CrudProvider ) {

    this.crudProvider.getPosts().then((data) => {
      console.log(JSON.stringify(data))
      this.mydata = data
    })

  }

  onEdit(id, title, province, name, pdate, ptime, description){
    console.log("edit info: "+id+title+province+name+pdate+ptime+description);

    this.navCtrl.push(EditPage, {
      id:id,
      title:title,
      name:name,
      province:province,
      pdate:pdate,
      ptime:ptime,
      description:description

    })
  }

  insertPage(){
    this.navCtrl.push(InsertPage);
  }



  onDelete(id) {

    this.crudProvider.deletePosts(id).then((result) => {
      console.log(result)
    }, (err) => {
      console.log("insert err: "+err);
    })
  }

}
