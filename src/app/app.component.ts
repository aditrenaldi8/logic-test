import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test-adit';

  //total customer
  customer : number= 4;
  // waktu dalam second
  time :number = 60; 
  // waktu tercepat
  fastest : number;

  //data keterangan jumlah teller dan kemapuan
  arr_teller : any[] =[
	  {kemampuan: 1, result:0, time : 0},
	  {kemampuan: 2, result:0, time : 0},
	  {kemampuan: 3, result:0, time : 0},
    {kemampuan: 5, result:0, time : 0},
  ]

  //data untuk proses looping
  arr_counter : any[]=[];
  arr_temp_result : any[]=[];
  //untuk menyimpan hasil sementara
  arr_result : any[]=[];

  constructor(){

  }

  ngOnInit(){
    this.sort();
    this.setArrCounter();
    this.generateResult()
  }

  setArrCounter(){
    for(let j=0;j<this.arr_teller.length;j++) {
      if(j==0){
        this.arr_counter.push(this.customer)
      }else{
        this.arr_counter.push(0);
      }

      this.arr_temp_result.push(0);
    }
  }

  // sorting data berdasakan kemampuan
  sort(){
    this.arr_teller.sort((a, b) => (a.kemampuan < b.kemampuan) ? 1 : -1)
  }

  //Proses perhitungan
  generateResult(){
    let most = 0;
    let position = 1;

    for(let i=0;i<this.customer;i++) {
      let tempmost= 0;
      for(let j=0;j<this.arr_teller.length;j++) {
        let temp= 0;
        temp = this.arr_counter[j] * (this.time/this.arr_teller[j].kemampuan);
  
        if(tempmost == 0){
          tempmost = temp;
        }else{
          tempmost = tempmost > temp ? tempmost : temp;
        }
        this.arr_temp_result[j] = this.arr_counter[j];

        if(j == this.arr_teller.length -1){
          this.arr_result.push({'value': tempmost, 'data': Object.assign([], this.arr_temp_result)})
        }
       
      }
      if(most == 0){
        most = tempmost;	
      }else{
        most = tempmost < most ? tempmost : most;
      }
      this.arr_counter[0] = this.arr_counter[0]-1;
      this.arr_counter[position] = this.arr_counter[position] + 1;

      if(this.arr_counter[this.arr_counter.length -1] > 0){
        position = 1;
      }else{
        position++;
      }
    }
    console.log('most', most)
   
    this.fastest = most;
    const data = this.arr_result.find(function(element) {return element.value == most; });
    this.setResult(data);
  }

  setResult(value : any){
    value.data.forEach((element,index)=>{
      this.arr_teller[index].result = element
    })
  }

}
