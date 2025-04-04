import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminmain',
  templateUrl: './adminmain.component.html',
  styleUrl: './adminmain.component.css'
})
export class AdminmainComponent implements OnInit {
  types: string | undefined;
  http: HttpClient;
  file: File | undefined;

  categorytype: { [key: string]: any }=
     
     {"Gift Packs":
      {mug:{type:"text"},
     parrot:{type:"text",validators:[Validators.min(4)]},
     ant:{type:"file"},
     pig:{type:"textarea"},},
     
     "Healthy sweets and snacks":{

      productimage:{type:"file"},
      ingredients:{type:"text"},
      productname:{type:"text",validators:[Validators.required]},
      description:{type:"textarea",value:656},
      weights:[{weight:250,actualprice:150,discountprice:135,stock:50}],
      productspecific:[{key:"gdf",value:'fgfd'}],
      sku:{type:"text"},
      tags:{type:"text"},
      productimage2:{type:"file"},
      description2:{type:"textarea"},
      keyfeatures:[{fearuretype:"authentic recipe",featureval:"nice"}],
      matterheadings:[{key:"nothing",value:"64"}],
      servingsuggestions:[{key:"hfj",value:"fdfg"}],
      storageinstructions:[{key:"fgdfg",value:"fgdvdb"}]



   },"Non-Vegeterian pickles":{
    productimage:{type:"file"},
    productname:{type:"text",validators:[Validators.required]},
    ingredients:{type:"text"},
    description:{type:"textarea"},
    weights:[{weight:250,actualprice:150,discountprice:135,stock:50}],
    productspecific:[{key:"gdf",value:'fgfd'}],
    sku:{type:"text"},
    tags:{type:"text"},
    productimage2:{type:"file"},
    description2:{type:"textarea"},
    keyfeatures:[{fearuretype:"authentic recipe",featureval:"nice"}],
    flavourprofile:[{key:"tangy",value:"spicy"}],
    matterheadings:[{key:"nothing",value:"64"}],
    usagetips:[{key:"jdsbc",value:"dvdf,m"}],
    servingsuggestions:[{key:"hfj",value:"fdfg"}],
    storageinstructions:[{key:"fgdfg",value:"fgdvdb"}]


   },"Masala and Karam Powders":{
    productimage:{type:"file"},
    productname:{type:"text",validators:[Validators.required,Validators.email]},
    ingredients:{type:"text"},
    description:{type:"textarea"},
    weights:[{weight:250,actualprice:150,discountprice:135,stock:50}],
    productspecific:[{key:"gdf",value:'fgfd'}],
    sku:{type:"text"},
    tags:{type:"text"},
    productimage2:{type:"file"},
    description2:{type:"textarea"},
    keyfeatures:[{fearuretype:"authentic recipe",featureval:"nice"}],
    flavourprofile:[{key:"tangy",value:"spicy"}],
    matterheadings:[{key:"nothing",value:"64"}],
   
    servingsuggestions:[{key:"hfj",value:"fdfg"}],
    storageinstructions:[{key:"fgdfg",value:"fgdvdb"}]


   },"Vegeterian Pickles":{

    productimage:{type:"file",value:667},
    productname:{type:"text",validators:[Validators.required,Validators.email]},
    ingredients:{type:"text"},
    description:{type:"textarea"},
    weights:[{weight:250,actualprice:150,discountprice:135,stock:50}],
    productspecific:[{key:"gdf",value:'fgfd'}],
    sku:{type:"text"},
    tags:{type:"text"},
    productimage2:{type:"file"},
    description2:{type:"textarea"},
    keyfeatures:[{fearuretype:"authentic recipe",featureval:"nice"}],
    flavourprofile:[{key:"tangy",value:"spicy"}],
    matterheadings:[{key:"nothing",value:"64"}],
    usagetips:[{key:"jdsbc",value:"dvdf,m"}],
    servingsuggestions:[{key:"hfj",value:"fdfg"}],
    storageinstructions:[{key:"fgdfg",value:"fgdvdb"}],
   
   }}


  reac!: FormGroup;
  allcategories: any;
  selectedcategory: any
  selectedformgroup!: FormGroup
  formdata!: FormData 
  catnme: any;

  constructor(http:HttpClient){
    this.http=http
  }
   

  ngOnInit(){

    this.http.get("http://localhost:2000/category/getcategories",{withCredentials:true}).subscribe((res:any)=>{
      this.allcategories=  res.message
      console.log(res.message)
    }) 

    this.reac = new FormGroup({
      name: new FormControl('ral'),
      arito: new FormGroup({
        kl: new FormControl(),
        drgl: new FormControl()
      }),
      ram: new FormArray([
        new FormControl(), // This will create the first input control in the FormArray
        new FormControl() 

      ])
    });
  }
  selectedcateg(y: any) {
    this.catnme=y
    this.imageFiles=[]
    this.selectedcategory = this.categorytype[y];
    console.log(this.selectedcategory)
    this.selectedformgroup = new FormGroup({});
  
    Object.keys(this.selectedcategory).forEach(fieldname => {
      let des = this.selectedcategory[fieldname];
  
      if (Array.isArray(des)) {
        let formarr = new FormArray(des.map(item => {
          let group = new FormGroup({});
          Object.keys(item).map(key => {
            group.addControl(key, new FormControl(item[key]));
          });
          return group;
        }));
        this.selectedformgroup.addControl(fieldname, formarr);
      } else if (typeof des === 'object' && des.type) {
            

        this.selectedformgroup.addControl(fieldname, new FormControl('',des['validators']));
      }
    });
  
    console.log(this.selectedformgroup);
  }

  add(y:any){
    let formArray = this.selectedformgroup.get(y) as FormArray;
  
    if (formArray) {
      let newGroup = new FormGroup({});
  
      // Copy field structure from existing fields
      Object.keys(this.selectedcategory[y][0]).forEach(key => {
        newGroup.addControl(key, new FormControl('')); // Adding empty input fields
      });
  
      formArray.push(newGroup);
    }
  }

  deleteField(y: string, index: number) {
    let formArray = this.selectedformgroup.get(y) as FormArray;
    
    if (formArray.length > 1) {
      formArray.removeAt(index);
    }
  }

  sdf() {
    this.formdata = new FormData();

    this.selectedformgroup.value.categoryname=this.catnme
  
    // Append form data fields
    this.formdata.append('data', JSON.stringify(this.selectedformgroup.value));
  
    // Dynamically append all images from form controls
    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((fileObj) => {
        this.formdata.append(fileObj.fieldName, fileObj.file);  // Appends each image dynamically
      });
    }
  
    this.http.post("http://localhost:2000/products/addproduct", this.formdata, { withCredentials: true })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  
   
 
  
  senddata(y:string){
    this.types=y
  }

  addcat(p:any){
    console.log(p.value)
    let formdata=new FormData()
    console.log(this.file)
    if (this.file) { 
      formdata.append('file',this.file)

      console.error("No file selected!");
    } 
    formdata.append('data', JSON.stringify({categoryname:p.value.categoryname,description:p.value.description}))
    console.log(formdata)

    this.http.post("http://localhost:2000/category/addcategory",formdata,{withCredentials:true}).subscribe((res:any)=>{

    })
  }

  

  imageFiles: { fieldName: string; file: File }[] = []; // Array to store dynamic images

previewImage(e: Event|null, fieldname: string) {
  const input = e?.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0]; // Get the first selected file
    console.log("Selected file:", file);

    // Check if field already exists, update it; otherwise, push new file
    const existingIndex = this.imageFiles.findIndex(item => item.fieldName === fieldname);
    if (existingIndex !== -1) {
      this.imageFiles[existingIndex].file = file; // Update existing entry
    } else {
      this.imageFiles.push({ fieldName: fieldname, file: file }); // Add new field dynamically
    }
  }
}

}

