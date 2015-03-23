var crca_value,pig_iron_value,foundry_value,grade,type,copper_percentage,carbon_percentage,silicon_percentage,manganese_percentage,crca_qty,pig_iron_qty,foundry_qty,total_qty,boring_qty,boring_rate;;
var crca_carbon_percentage,crca_silicon_percentage,crca_manganese_perentage,crca_copper_percentage,mo_percentage=0,cr_percentage,crca_mo_percentage,crca_cr_percentage;
var pig_iron_carbon_percentage=0,pig_iron_silicon_percentage=0,pig_iron_manganese_percentage=0,pig_iron_copper_percentage=0,pig_iron_mo_percentage=0,pig_iron_cr_percentage=0;
var foundry_carbon_percentage,foundry_silicon_percentage,foundry_manganese_percentage,foundry_copper_percentage,foundry_mo_percentage,foundry_cr_percentage;
var calculated_copper_percentage,calculated_carbon_percentage,calculated_silicon_percentage,calculated_manganese_percentage,total_cost_core_sand=0;
var recovery = [], cost = [],material = [], quantity = [];
var graphite_qty,copper_qty,coke_qty,fe_si_qty,fe_mn_qty,fe_mo_qty=0,fe_cr_qty=0,tin_qty=0;
var cavity = [],casting_length = [],casting_breadth = [],casting_height = [],box_length = [],box_breadth = [],box_cope_height = [],box_drag_height = [],sand_cost = [],sand_material = [],no_of_box = [],sand_requirement = [],new_sand = [], bentonite = [],lustron = [],pouring_weight = [];
var new_sand_qty,bentonite_qty,lustron_qty,lm=[],sand_yield=62,good_casting=[],sand_cost_per_kg=[],total_cost = [],sand_qty = [];
var washed_sand_qty,resin_qty,hardener_qty,amine_qty,total_qty,cold_material = [],cold_cost = [],washed_cost,resin_cost,hardener_cost,amine_cost,total_cost;
var total_metal_qty,melting_loss,net_metal_weight,metallic_cost_furnace;
var treatment_qty = [],treatment_rate = [],treatment_material= [],treatment_individual_total=[],total_treatment_qty=0,total_treatment_cost=0,total_metal_weight=0,cost_metal_yield=0;
var rr_credit_qty,rr_credit_rate,rr_credit_total,total_metallic_incl_rr,less_rr_value,total_metallic_excl_rr,total_metallic_cost,box_size_requirement;
function flush()
{
  recovery = [];cost=[];material=[];quantity=[];
 // console.log(casting_length.length);
  for(i=0;i<casting_length.length;i++)
  {
   // console.log("called");
    cavity.pop();
    casting_length.pop();
    casting_breadth.pop();
    casting_height.pop();
    box_length.pop();
    box_breadth.pop();
    box_drag_height.pop();
    box_cope_height.pop(); 
    sand_cost_per_kg.pop();
    new_sand.pop();
    bentonite.pop();
    lustron.pop();
    pouring_weight.pop();
    lm.pop();
    good_casting.pop();
    $(".disp_content").remove();
  }
  sand_material=[];sand_qty=[];sand_cost=[];
  //console.log(cavity+" "+casting_length+" "+casting_breadth+" "+casting_height+" "+box_length+" "+box_breadth+" "+box_drag_height+" "+box_cope_height+" "+sand_cost_per_kg+" "+new_sand+" "+bentonite+" "+lustron+" "+pouring_weight+" "+lm+" "+good_casting);
  total_cost=[];sand_qty=[];cold_material=[];cold_cost=[];
  treatment_qty=[];treatment_rate=[];treatment_material=[];treatment_individual_total=[];
  total_treatment_qty = 0;
  total_treatment_cost=0;total_metal_weight=0;cost_metal_yield=0;
}
function getpercentageCrca()
{
 if($("#crca").is(":checked"))
 {
 crca_carbon_percentage = parseFloat($('div [data-grade="crca"]').data("carbon"));
 crca_silicon_percentage = parseFloat($('div [data-grade="crca"]').data("silicon"));
 crca_manganese_perentage = parseFloat($('div [data-grade="crca"]').data("manganese"));
 crca_copper_percentage = parseFloat($('div [data-grade="crca"]').data("copper"));
 crca_mo_percentage = parseFloat($('div [data-grade="crca"]').data("mo"));
 crca_cr_percentage = parseFloat($('div [data-grade="crca"]').data("cr"));
 }
}

function getPercentagePigIron()
{
 if($("#pig_iron").is(":checked"))
 {
 pig_iron_carbon_percentage = parseFloat($('div [data-grade="pig_iron"]').data("carbon")); 
 pig_iron_silicon_percentage = parseFloat($('div [data-grade="pig_iron"]').data("silicon"));
 pig_iron_manganese_percentage = parseFloat($('div [data-grade="pig_iron"]').data("manganese"));
 pig_iron_copper_percentage = parseFloat($('div [data-grade="pig_iron"]').data("copper"));
 pig_iron_mo_percentage = parseFloat($('div [data-grade="pig_iron"]').data("mo"));
 pig_iron_cr_percentage = parseFloat($('div [data-grade="pig_iron"]').data("cr"));
 }
}

function getPercentageFoundry()
{
 if($("#foundry").is(":checked"))
 {
 foundry_carbon_percentage = parseFloat($('div [data-grade="foundry"]').data("carbon"));
 foundry_silicon_percentage = parseFloat($('div [data-grade="foundry"]').data("silicon"));
 foundry_manganese_percentage = parseFloat($('div [data-grade="foundry"]').data("manganese"));
 foundry_copper_percentage = parseFloat($('div [data-grade="foundry"]').data("copper"));
 foundry_mo_percentage = parseFloat($('div [data-grade="foundry"]').data("mo"));
 foundry_cr_percentage = parseFloat($('div [data-grade="foundry"]').data("cr"));
 }
}

function calculateCarbonWeight()
{
 
 var carbon_weight=(crca_qty*(crca_carbon_percentage/100))+(pig_iron_qty*(pig_iron_carbon_percentage/100))+(foundry_qty*(foundry_carbon_percentage/100));
 return carbon_weight;
}

function calculateSiliconWeight()
{
 return (crca_qty*(crca_silicon_percentage/100))+(pig_iron_qty*(pig_iron_silicon_percentage/100))+(foundry_qty*(foundry_silicon_percentage/100));
}

function calculateManganeseWeight()
{
 return (crca_qty*(crca_manganese_perentage/100))+(pig_iron_qty*(pig_iron_manganese_percentage/100))+(foundry_qty*(foundry_manganese_percentage/100));
}

function calculateCopperWeight()
{
 return (crca_qty*(crca_copper_percentage/100))+(pig_iron_qty*(pig_iron_copper_percentage/100))+(foundry_qty*(foundry_copper_percentage/100));
}
function calculateMoWeight()
{
 return (crca_qty*(crca_mo_percentage/100))+(pig_iron_qty*(pig_iron_mo_percentage/100))+(foundry_qty*(foundry_mo_percentage/100));
}
function calculateCrWeight()
{
 return (crca_qty*(crca_cr_percentage/100))+(pig_iron_qty*(pig_iron_cr_percentage/100))+(foundry_qty*(foundry_cr_percentage/100));
}
function getValue(type)
{
  recovery = [];
  material = [];
  cost = [];
  var rec = $('#get_raw_material [data-type="'+type+'"]');
  $.each(rec,function(key,value){
     recovery.push($(this).data("recovery"));
     material.push($(this).data("material"));
     cost.push($(this).data("cost"));
  });
}
function calculateQty(carbon_weight_percentage,silicon_weight_percentage,managnese_weight_percentage,copper_weight_percentage,mo_weight_percentage,cr_weight_percentage)
{
 total_qty=parseFloat(total_qty);
 recovery=recovery.map(Number);
 carbon_weight_percentage=parseFloat(carbon_weight_percentage);
 silicon_weight_percentage=parseFloat(silicon_weight_percentage);
 copper_weight_percentage=parseFloat(copper_weight_percentage);
 managnese_weight_percentage=parseFloat(managnese_weight_percentage);
 carbon_percentage = parseFloat(carbon_percentage);
 for(i=0;i<material.length;i++)
 {
     if(material[i].toLowerCase().trim() =="graphite")
     {
         graphite_qty = (carbon_percentage - carbon_weight_percentage)*total_qty/recovery[i];
         if(graphite_qty < 0)
         {
             graphite_qty = 0;
         }
         quantity.push(graphite_qty);
     }
     else if(material[i].toLowerCase().trim() =="copper")
     {
         copper_qty = (copper_percentage - copper_weight_percentage)*total_qty/recovery[i];
         if(copper_qty < 0)
         {
             copper_qty = 0;
         }
         quantity.push(copper_qty);
     }
     else if(material[i].toLowerCase().trim() =="coke" ||  material[i].toLowerCase().trim() === "cpc")
     {
         coke_qty = (carbon_percentage - carbon_weight_percentage)*total_qty/recovery[i];
         if(coke_qty < 0)
         {
             coke_qty = 0;
         }
         quantity.push(coke_qty);
     }
     else if(material[i].toLowerCase().trim() =="fe-si")
     {
         fe_si_qty = (silicon_percentage - silicon_weight_percentage)*total_qty/recovery[i];
         if(fe_si_qty < 0)
         {
             fe_si_qty = 0;
         }
         quantity.push(fe_si_qty);
     }
     else if(material[i].toLowerCase().trim() =="fe-mn")
     {
         fe_mn_qty = (manganese_percentage - managnese_weight_percentage )*total_qty/recovery[i];
         if(fe_mn_qty < 0)
         {
             fe_mn_qty = 0;
         }
         quantity.push(fe_mn_qty);
     }
     else if(material[i].toLowerCase().trim() =="fe-mo")
     {
         fe_mo_qty = (mo_percentage - mo_weight_percentage )*total_qty/recovery[i];
         if(fe_mo_qty < 0)
         {
             fe_mo_qty = 0;
         }
         quantity.push(fe_mo_qty);
     }
      else if(material[i].toLowerCase().trim() =="fe-cr")
     {
         fe_cr_qty = (cr_percentage - cr_weight_percentage )*total_qty/recovery[i];
         if(fe_cr_qty < 0)
         {
             fe_cr_qty = 0;
         }
         quantity.push(fe_cr_qty);
     }
     else if(material[i].toLowerCase().trim() =="tin")
     {
      tin_qty=0;
         /*(fe_cr_qty = (cr_percentage - cr_weight_percentage )*total_qty/recovery[i];
         if(fe_cr_qty < 0)
         {
             fe_cr_qty = 0;
         }*/
         quantity.push(tin_qty);
     }
 }
 
 
}
function getRawMaterialCost()
{
  var crca_rate,pig_iron_rate,foundry_rate;
  grade = $("#grade").val().trim();
  type = $('input[name="iron"]:checked').val();
  total_qty = $("#quantity").val();
  total_qty = parseFloat(total_qty);
  carbon_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("carbon"));
  silicon_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("silicon"));
  manganese_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("manganese"));
  copper_percentage= parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("copper"));
  if(grade.toLowerCase().indexOf("mo")>=0)
  {
  mo_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("mo"));
  }
  var value;
  value=$("input:radio[name=iron]:checked").val();
  if(value=== "sg_iron")
  {
  crca_qty=total_qty*($('#yield').val()/100);
  }
  else 
  {
    if($('#calculateFromYield').prop("checked"))
    {
      crca_qty = total_qty * ($('#yield').val()/100);
    }
    else{
      crca_qty = total_qty*(45/100);
    }
    cr_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("cr"));
  }
  crca_qty = parseFloat(crca_qty);
  crca_rate = $("div [data-type='crca']").data("cost");
  getpercentageCrca();
  if($("#pig_iron").is(":checked"))
  {
    if(value === "sg_iron")
    {
    pig_iron_qty =total_qty * (10/100);
    foundry_qty =total_qty - (crca_qty + pig_iron_qty);
    }
    else
    {
      if($('#calculateFromYield').prop("checked"))
      {
        pig_iron_qty =total_qty * (15/100);
        foundry_qty =total_qty - (crca_qty + pig_iron_qty);
        boring_qty = 0;
      }
      else{
        pig_iron_qty =total_qty * (15/100);
        foundry_qty =total_qty * (30/100);
        boring_qty=total_qty *(10/100) ;
      }
    }

    pig_iron_rate = $("div [data-type='pig_iron']").data("cost") ;
    foundry_rate = $("div [data-type='foundry']").data("cost") ;
    boring_rate = $("div [data-type='boring']").data("cost") ;
    getPercentagePigIron();
    getPercentageFoundry();
  }
  else
  {
       // console.log("Pig iron not selected");

    pig_iron_qty = 0;
    pig_iron_rate = 0;
    foundry_rate = $("div [data-type='foundry']").data("cost");
    foundry_qty = total_qty - crca_qty;
    if($('#boring').prop("checked"))
    {
     // console.log(" inside pig iron not selected boring checked");
      boring_qty = total_qty * (10/100);
      foundry_qty = total_qty - (crca_qty + boring_qty);
     // console.log("boring = "+boring_qty);
    }
    else{
     // console.log("inside pig iron not selected boring not checked");
      boring_qty = 0;
    }
    getPercentageFoundry();
   // console.log("end of pig iron not selected");
  }
  pig_iron_qty = parseFloat(pig_iron_qty);
  foundry_qty = parseFloat(foundry_qty);

  var carbon_weight_percentage = calculateCarbonWeight();

  carbon_weight_percentage = (parseFloat(carbon_weight_percentage)/total_qty)*100;
  var silicon_weight_percentage = calculateSiliconWeight();

  silicon_weight_percentage = (parseFloat(silicon_weight_percentage)/total_qty)*100;
  var managnese_weight_percentage = calculateManganeseWeight();

  managnese_weight_percentage = (parseFloat(managnese_weight_percentage)/total_qty)*100;
  var copper_weight_percentage = calculateCopperWeight();

  copper_weight_percentage = (parseFloat(copper_weight_percentage)/total_qty)*100;
  var mo_weight_percentage = calculateMoWeight();
  mo_weight_percentage = (parseFloat(mo_weight_percentage)/total_qty)*100;
  var cr_weight_percentage = calculateCrWeight();
  cr_weight_percentage = (parseFloat(cr_weight_percentage)/total_qty)*100;
  getValue(type);
  if(grade.toLowerCase().indexOf("mo")>=0)
  {
    calculateQty(carbon_weight_percentage,silicon_weight_percentage,managnese_weight_percentage,copper_weight_percentage,mo_weight_percentage,0);  
  }
  else if(grade.toLowerCase().indexOf("fg")>=0)
  {
    calculateQty(carbon_weight_percentage,silicon_weight_percentage,managnese_weight_percentage,copper_weight_percentage,0,cr_weight_percentage);  
  }
  else
  {
   calculateQty(carbon_weight_percentage,silicon_weight_percentage,managnese_weight_percentage,copper_weight_percentage,0,0);   
  }
  
  total_metal_qty = total_qty;
  $("#display_content #main_table").append("<h3 id='head_raw_material_cost' class='text-center' >A- Charge Mix Cost for "+type.toUpperCase().replace("_","")+"</h3>"); 
  $("#display_content #main_table").append("<table class='table table-bordered table-hover' id='table_grade'><tr><th>"+type.toUpperCase().replace("_"," ")+"</th><th>Grade "+grade+"</th><th> Furance Capacity "+$("#quantity").val()+" kgs"+"</th><th> Yield("+$("#yield").val()+"%)</th></tr></table>");
  $("#display_content #main_table").append("<table class='table table-bordered table-hover well test' id='raw_material_cost' > <tr><th>Material</th><th>Qty (kgs)</th><th>Rs/kg</th><th>Total Cost (INR)</th></tr></table>");
  var table_name="#raw_material_cost";
  var crca_cost = parseFloat(crca_qty) * parseFloat(crca_rate);
  var pig_iron_cost = parseFloat(pig_iron_qty) * parseFloat(pig_iron_rate);
  var foundry_cost = parseFloat(foundry_qty) * parseFloat(foundry_rate);
  var boring_cost=0;
  var temp_quantity = 0;
  if(value.trim() === "gray_iron")
  {
 boring_cost = parseFloat(boring_qty)  * parseFloat(boring_rate);
  }
  var temp_cost,sum = parseFloat(crca_cost) + parseFloat(pig_iron_cost) + parseFloat(foundry_cost) + parseFloat(boring_cost);
  var temp_quantity = crca_qty + pig_iron_qty + foundry_qty + boring_qty;
  printRawMaterialTable(table_name,"CRCA",crca_qty.toFixed(2),crca_rate,crca_cost.toFixed(2));
  printRawMaterialTable(table_name,"Pig Iron",pig_iron_qty.toFixed(2),pig_iron_rate,pig_iron_cost.toFixed(2));
  printRawMaterialTable(table_name,"Foundry R/R",foundry_qty.toFixed(2),foundry_rate,foundry_cost.toFixed(2));
  if(value.trim() === "gray_iron")
  {
    printRawMaterialTable(table_name,"Bourings",boring_qty.toFixed(2),boring_rate,boring_cost.toFixed(2));
  }
  //printRawMaterialTable(table_name,"Total",total_qty.toFixed(2),"-",sum.toFixed(2));
  
  $.each(material,function(key,value){
  total_metal_qty+=parseFloat(quantity[key]);
  temp_cost = parseFloat(quantity[key]) * parseFloat(cost[key]);
  console.log("quantity = "+temp_cost);
  sum += parseFloat(temp_cost);
  temp_quantity +=parseFloat(quantity[key]);
  //console.log(sum);
  printRawMaterialTable(table_name,value,quantity[key].toFixed(2),cost[key],temp_cost.toFixed(2)); 
  });
  printRawMaterialTable(table_name,"Total",temp_quantity.toFixed(2),"-",sum.toFixed(2));
  melting_loss = (5/100)*total_metal_qty;
  net_metal_weight = parseFloat(total_metal_qty) - parseFloat(melting_loss);
  metallic_cost_furnace = parseFloat(sum) / parseFloat(net_metal_weight);
  total_metallic_incl_rr = sum.toFixed(2);
}

function getSandCost()
{
  var div = $("#get_box_dimension").children();
  var sand_mixer;
  var box;
  var total_qty=0,sand_total_cost=0;

  if($("#sand_mixer").find(":selected").val().toLowerCase()==="others")
  {
    mixer_qty=$("#new_sand_mixer").val();
  }
  else
  {
    mixer_qty=$("#sand_mixer").find(":selected").val();
  }
  
  mixer_qty = parseInt(mixer_qty);

  $.each(div,function(key,value){

  casting_length.push($(this).data("casting-length"));
  casting_breadth.push($(this).data("casting-breadth"));
  casting_height.push($(this).data("casting-height"))
  cavity.push($(this).data("cavity"));
  box_length.push($(this).data("box-length"));
  box_breadth.push($(this).data("box-breadth"));
  box_cope_height.push($(this).data("box-cope-height"));
  box_drag_height.push($(this).data("box-drag-height"));
  sand_requirement.push($(this).data("sand-requirement"));
  box_size_requirement=$(this).data("box-size-requirement");
  new_sand.push($(this).data("new-sand"));
  bentonite.push($(this).data("bentonite"));
  lustron.push($(this).data("luston"));
    });
  var rec = $('div [data-type="sand_cost"]');
  $.each(rec,function(key,value){
  sand_material.push($(this).data("material"));
  sand_cost.push($(this).data("cost"));
  });
  $.each(sand_material,function(key,value){
  if(value.toLowerCase() === "new_sand")
  {
    new_sand_qty = mixer_qty*(2/100);
    sand_qty.push(new_sand_qty);
    total_cost.push(parseFloat(new_sand_qty) * parseFloat(sand_cost[key]));
  }
  else if(value.toLowerCase() === "bentonite")
  {
    bentonite_qty = mixer_qty * (0.8/100);
    sand_qty.push(bentonite_qty);
    total_cost.push(parseFloat(bentonite_qty) * parseFloat(sand_cost[key]));
  }
  else if(value.toLowerCase() === "lustron")
  {
    lustron_qty = mixer_qty * (0.4/100);
    sand_qty.push(lustron_qty);
    total_cost.push(parseFloat(lustron_qty) * parseFloat(sand_cost[key]));
  }
  });
  $.each(sand_requirement,function(key,value){
          var box=0;

  value = parseInt(value);
  for( var i=0;i<parseInt(mixer_qty);i+=value)
  {
    box++;
  }
  
  no_of_box.push(box); 
  });
  var cast_value = $("#cast_value").val();
  var weight = $("#get_weight").val();
  var temp_cost= 0;
  sand_yield=$("#yield").val()/100;
  $.each(cavity,function(key,value){
  pouring_weight.push(parseFloat(weight)+(cavity*parseFloat(cast_value)));
  console.log("mixer_qty ="+mixer_qty);
  console.log("box_size_requirement ="+box_size_requirement);
  console.log("cavity ="+cavity);
  var temp_lm = (mixer_qty/parseFloat(box_size_requirement))*parseFloat(cavity)*parseFloat(cast_value)/parseFloat(sand_yield);
  lm.push(parseFloat(temp_lm));
  var temp_good_casting = parseFloat(lm)*parseFloat(sand_yield);
  console.log("lm "+parseFloat(lm));
  good_casting.push(temp_good_casting);
  $.each(total_cost,function(key,value){
    temp_cost += parseFloat(value);
  });
  var cost = parseFloat(temp_cost)/parseFloat(temp_good_casting);
  console.log("temp_cost "+temp_cost);
  console.log("temp_good_casting "+temp_good_casting);
  sand_cost_per_kg.push(cost);
  });
  var box_dimension=$("#length_size").val()+"X"+$("#breadth_size").val()+"X"+$("#cope_height_size").val()+"X"+$("#drag_height_size").val();
  $("#display_content #main_table").append("<h3 id='head_dis_sand_cost' class='text-center'>Sand Cost <br> ("+box_dimension+")</h3>");
  $("#display_content #main_table").append("<p id='table_sand' class='text-center'> Sand Mixer Capacity </th><th>"+mixer_qty+"kgs </p>")
  $("#display_content #main_table").append("<table class='table table-bordered table-hover well test' id='dis_sand_cost' ><tr><th>Material</th><th>Qty (kgs)</th><th>Rs/kg</th><th>Total Cost (INR)</th></tr></table>");
  var table_name="#dis_sand_cost";
  $.each(sand_cost,function(key,value){
   total_qty+=sand_qty[key];
   sand_total_cost+=total_cost[key];
   printRawMaterialTable(table_name,sand_material[key],sand_qty[key],sand_cost[key],total_cost[key].toFixed(2));
  });
  printRawMaterialTable(table_name,"Total",total_qty,"-",sand_total_cost);
  //printRawMaterialTable(table_name,"yield %",sand_yield,"-","-");
  //printRawMaterialTable(table_name,"LM(kgs)",lm[0].toFixed(2),"-","-");
  //printRawMaterialTable(table_name,"Good Casting",good_casting[0].toFixed(2),"-","-");
  printRawMaterialTable(table_name,"Sand Cost Per Kg of Good Casting",sand_cost_per_kg[0].toFixed(2),"-","-");
}
function getTreatmentCost()
{
  var cost_yield;
  getTreatmentValues();
  $.each(treatment_material,function(key,value){

  treatment_individual_total.push(treatment_qty[key]*treatment_rate[key]);
  total_treatment_qty+=treatment_qty[key];
  total_treatment_cost+=treatment_individual_total[key];
  });
  total_metal_weight=total_treatment_qty+net_metal_weight;
  cost_metal_yield = total_metal_weight * $("#yield").val()/100;
  rr_credit_qty= (total_metal_weight - cost_metal_yield)*(98/100);
  rr_credit_rate = $("div [data-type='foundry']").data("cost");;
  rr_credit_total = rr_credit_rate * rr_credit_qty;
  less_rr_value = total_metallic_incl_rr - rr_credit_total;
  total_metallic_excl_rr = less_rr_value / cost_metal_yield;
  cost_yield = total_treatment_cost / cost_metal_yield;
  total_metallic_cost = cost_yield +total_metallic_excl_rr;
  $("#display_content #main_table").append("<h3 id='head_treat' class='text-center'>B - Treatment RM Cost For ("+$("#quantity").val()+"kgs)</h3>");
  //$("#display_content").append("<table class='table table-bordered table-hover well test' id='display_equipment_detail'>");
  $("#display_content #main_table").append("<table class='table table-bordered table-hover well test' id='display_equipment_detail' >");
  $("#display_equipment_detail").append("<tr><th>Treatment Cost Details</th><th>kgs</th><th>Rs/kg</th><th>Total Cost (INR)</th></tr></table>");
  var table_name="#display_equipment_detail";
   $.each(treatment_material,function(key,value){
    printRawMaterialTable(table_name,value,treatment_qty[key],treatment_rate[key],(treatment_qty[key]*treatment_rate[key]).toFixed(2));
  });
  printRawMaterialTable(table_name,"Total",total_treatment_qty.toFixed(2),"-",total_treatment_cost.toFixed(2));
  //printRawMaterialTable(table_name,"Total Metal Weight",total_metal_weight.toFixed(2),"-","-");
  $("#display_content #main_table").append("<table class='table table-bordered table-hover well test' id='treat_disp_detail' ><tr><td>Treatment Cost Per.kg</td><td>"+cost_yield.toFixed(2)+"</td></tr></table>");
  
  $("#display_content #main_table").append("<h3 id='head_metal' class='text-center'>Metallics Cost</h3>");
  //$("#display_content").append("<table class='table table-bordered table-hover well test' id='display_equipment_detail'>");
  $("#display_content #main_table").append("<table class='table table-bordered table-hover well test' id='display_metallic_detail' ></table>");
  $("#display_metallic_detail").append("<tr><th>Material</th><th>kgs</th><th>Rs/kg</th><th>Total Cost (INR)</th></tr></table>");
  var table_name="#display_metallic_detail";

  printRawMaterialTable(table_name,"R/R Credit Back @ 98% (kgs)",rr_credit_qty.toFixed(2),rr_credit_rate,rr_credit_total.toFixed(2));
  printRawMaterialTable(table_name,"Metallics (A) Cost incl. R/R","-","-",total_metallic_incl_rr);
  printRawMaterialTable(table_name,"Less R/R Value (INR)","-","-",less_rr_value.toFixed(2));
  printRawMaterialTable(table_name,"Metallics Cost (A1) Excl. R/R (INR)","-","-",total_metallic_excl_rr.toFixed(2));
  printRawMaterialTable(table_name,"Total Metallics Cost (A1+B)(INR)","-","-",total_metallic_cost.toFixed(2));
}
function getTreatmentValues()
{

  var div;
  var name=$('input[name="iron"]:checked').val();
  if(name ==="gray_iron")
  {
    div=$('#get_raw_material [data-type="gray_treatment_cost"]');
  }
  else
  {
    div=$('#get_raw_material [data-type="treatment_cost"]');
  }
  $.each(div,function(key,value){
    if((name==="gray_iron")&&($(this).data("material").toLowerCase()==="fe-si-mg"||$(this).data("material").toLowerCase()==="cov_steel"))
    {
      treatment_qty.push(0);
  treatment_rate.push(0);
  treatment_material.push($(this).data("material"));    
    }
    else
  {
    treatment_qty.push($(this).data("recovery"));
  treatment_rate.push($(this).data("cost"));
  treatment_material.push($(this).data("material"));
}
  });

  }
  function getColdBoxCost()
  {
  var core_rejection,total_core_sand;
  var core_weight = $("#core_mix").val();
  if(parseFloat(core_weight) == 0)
  {

  }
  else{
  core_weight = parseInt(core_weight);
  washed_sand_qty = (100/100)*core_weight;
  resin_qty = (0.85/100)*core_weight;
  hardener_qty = (0.85/100)*core_weight;
  amine_qty = (0.0023/100)*core_weight;
  var rec = $('div [data-type="cold_cost"]');
  $.each(rec,function(key,value){
  cold_material.push($(this).data("material"));
  cold_cost.push($(this).data("cost"));
  });
  $.each(cold_material,function(key,value){
  if(value.toLowerCase() === "washed_sand")
  {
    washed_cost = (parseFloat(washed_sand_qty) * parseFloat(cold_cost[key]));
  }
  else if(value.toLowerCase() === "resin")
  {
    resin_cost = (parseFloat(resin_qty) * parseFloat(cold_cost[key]));
  }
  else if(value.toLowerCase() === "hardener")
  {
    hardener_cost = (parseFloat(hardener_qty) * parseFloat(cold_cost[key]));
  }
  else if(value.toLowerCase() === "amine")
  {
    amine_cost = (parseFloat(amine_qty) * parseFloat(cold_cost[key]));
  }
  });
  total_cost = parseFloat(washed_cost)+parseFloat(resin_cost)+parseFloat(hardener_cost)+parseFloat(amine_cost);
  total_qty = parseFloat(washed_sand_qty)+parseFloat(resin_qty)+parseFloat(hardener_qty)+parseFloat(amine_qty);
  core_rejection = (10/100)*total_qty;
  total_core_sand = parseFloat(total_qty) - parseFloat(core_rejection);
  total_cost_core_sand = parseFloat(total_cost) / parseFloat(total_core_sand);
  $("#display_content #main_table").append("<h3 id='head_dis_cold_cost' class='text-center' >Cold Box Core Cost</h3>");
  $("#display_content #main_table").append("<p id='name_cold' class='text-center'>Core Sand Mixer "+core_weight+"kgs </p>")
  $("#display_content #main_table").append("<table class='table table-bordered table-hover well test' id='dis_cold_cost' ><tr><th>Material</th><th>Qty (kgs)</th><th>Rs/kg</th><th>Total Cost (INR)</th></tr></table>");
  
  var table_name="#dis_cold_cost";

  printRawMaterialTable(table_name,"Washed Sand",washed_sand_qty.toFixed(2),cold_cost[0],washed_cost.toFixed(2));
  printRawMaterialTable(table_name,"Resin",resin_qty.toFixed(2),cold_cost[1],resin_cost.toFixed(2));
  printRawMaterialTable(table_name,"Hardener",hardener_qty.toFixed(2),cold_cost[2],hardener_cost.toFixed(2));
  printRawMaterialTable(table_name,"Amine",amine_qty.toFixed(2),cold_cost[3],amine_cost.toFixed(2));
  printRawMaterialTable(table_name,"Total","-","-",total_cost.toFixed(2));
  printGoodCastingTable(table_name,"Core cost per kg of good cast",((parseFloat($("#core_weight").val())*total_cost_core_sand)/$("#cast_value").val()).toFixed(2));
}
}