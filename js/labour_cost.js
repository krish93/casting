//$("document").ready(function(){
  var file_lines = [], designation = [], monthly_capacity = [], nos = [], power_file = [], spec_file = [];
  var capacity = 0,total_man_power_cost,good_casting_production,man_power_cost_good_casting,yield,year,year_val=1;
  var depriciation,rm_15_days,turn_over_raw_material,raw_material_mark_up,purchased_parts,total_depriciation=0;
  var purchase_parts_expenses=10774676.56,purchased_good_material_mark_up,purchased_parts_material_mark_up,cost,remaining_attendants;
  var power_cost,unit,private_rate,power_melting_loss,total_plant_overhead,icc_rm,plant_overhead_rm,sga_rm,profit_rm,profit_manufacturing_cost,rejection,final_total=0,sga_overhead;
  var power_cost,melting_cost,moulding_machine_cost,mould_cost,consumable_cost,core_cost,shot_blasting,labour_cost,total,sub_total_cost,rejection_percent,plant_overhead,total_machine_cost_good_Casting;
  var raw_casting_cost,casting_cost,ed_cost,total_part_cost;
  function flush_labour()
  {
    designation = [];
    monthly_capacity = [];
    nos = [];
  }
  //Return the object 
  function returnObject(file_lines,type,designation)
  {
    var obj,month_capacity;
    $.each(file_lines,function(key,value){
      if(value.type.toLowerCase() === type && JSON.stringify(value.designation.toLowerCase()).replace(/\"/g,'').indexOf(designation) >=0 )
      {
        if(year>2015)
        {
          month_capacity=parseFloat(value.monthly_capacity)+parseFloat(value.monthly_capacity*year_val);
        }
        else if(parseInt(year)==2015)
        {
          month_capacity=parseFloat(value.monthly_capacity);
        }
        else
        {
          month_capacity=parseFloat(value.monthly_capacity)-parseFloat(value.monthly_capacity*year_val);
        }
        obj={
          ID: value.ID,
          designation: value.designation,
          nos: value.nos,
          monthly_capacity: month_capacity,
          type: value.type
        };
      }
    });
    return obj;
  }
  //Return the respective designation of the type specified
  function findDesignation(file_lines,type)
  { 
    var designation = []
    $.each(file_lines,function(key,value){
      if(value.type === type)
      {
        designation.push(value.designation);
      }
    });
    return designation;
  }
  //return the monthly capacity of the specified type
  function findMonthlyCapacity(file_lines,type)
  {
    var monthly_capacity = [];
    $.each(file_lines,function(key,value){
      if(value.type === type)
      {
        if(year>2015)
        {
          monthly_capacity.push(parseFloat(value.monthly_capacity)+parseFloat(value.monthly_capacity*year_val));
        }
        else if(year==2015)
        {
          monthly_capacity.push(parseFloat(value.monthly_capacity)+parseFloat(value.monthly_capacity*0));
        }
        else
        {
          monthly_capacity.push(parseFloat(value.monthly_capacity)-parseFloat(value.monthly_capacity*year_val)); 
        }
      }
    });
    return monthly_capacity;
  }
  //return the nos of the specified type
  function findNos(file_lines,type)
  {
    var nos = [];
    $.each(file_lines,function(key,value){
      if(value.type === type)
      {
        nos.push(value.nos);
      }
    });
    return nos;
  }
  //Find the Total indirect cost
  function findTotalIndirectCost(file_lines)
  {
    var total_sum = 0;
    $.each(file_lines,function(key,value){
      if(value.type !== "direct_labour")
      {
        if(year>2015)
        {
          total_sum += (value.nos * (parseFloat(value.monthly_capacity)+parseFloat(value.monthly_capacity)*year_val))/capacity;
        }
        else if(year===2015)
        {
         total_sum += (value.nos * (parseFloat(value.monthly_capacity)+parseFloat(value.monthly_capacity)*0))/capacity; 
        }
        else
        {
         total_sum += (value.nos * (parseFloat(value.monthly_capacity)-parseFloat(value.monthly_capacity)*year_val))/capacity; 
        }
      }
    });
    return total_sum;
  }
  //Calculate the direct man power cost
  function manPowerCost(file_lines)
  {
    var total_sum = 0;
    $.each(file_lines,function(key,value){
      if((value.type).trim()==="direct_labour")
      {
        if(year>2015)
        {
        total_sum += (value.nos * (parseFloat(value.monthly_capacity)+parseFloat(value.monthly_capacity)*year_val))*12;
        }
        else if(year==2015)
        {
          total_sum += (value.nos * (parseFloat(value.monthly_capacity)))*12;
        }
        else
        {
         total_sum += (value.nos * (parseFloat(value.monthly_capacity)-parseFloat(value.monthly_capacity)*year_val))*12; 
        }
      //  console.log(total_sum);
      }
    });
    return total_sum;
  }
  function getResultfromSpec(spec_file,type)
  {
    var return_data=[];
    $.each(spec_file,function(key,value){
      return_data.push(getFieldData(type,value));
    });
    return return_data;
  }
  function getFieldData(field,record)
  {
    var return_data;
    $.each(record,function(key,value){
      if(key==field)
       {
        return_data=value;
       }
    })
    return return_data;
  }
  //calcualte the Depriciation
  function calculateDepriciation()
  {
    var computer,racks,pallets,fork_lift,hoist,partitions,building,total_depriciation;
    computer = 35000 * 7;
    racks = 144 * 5000;
    pallets = 500 * 800;
    fork_lift = 800000;
    hoist = 550000 * 3;
    partitions = 500000;
    building  = 1200 * 1200;
    total_depriciation = (computer + racks + pallets + fork_lift + hoist + partitions)/8 + (building)/25;
    return total_depriciation;
  }
  function calculateFoundryRawMaterial(good_casting)
  {
    var lm,crca,fe_mn,fe_si,fe_si_mg,cov_steel,ramming_steel,bentonite,lustron,sand,resin_hardener;
    var amine,foundry,total_month;
    var crca_rate=28.5,fe_mn_rate=60,fe_si_rate=76,fe_si_mg_rate=115,cov_steel_rate=30;
    var ramming_steel_rate=35,bentonite_rate=2.1,lustron_rate=17.4,sand_rate=2.4;
    var resin_hardener_rate=120,amine_rate=120,foundry_rate=30;
    lm=good_casting/parseFloat(yield).toFixed(2);
    crca = lm*parseFloat(yield).toFixed(2);
    fe_mn=lm*0.0012;
    fe_si=lm*(1.3/100);
    fe_si_mg=lm*(0.9/100);
    cov_steel=lm*(1/100);
    ramming_steel=lm*(0.32/100);
    bentonite=lm*(0.01);
    lustron=lm*0.005;
    sand=lm*0.001;
    resin_hardener=lm*(0.29/100);
    amine=lm*(0.29/100);
    foundry=(lm - good_casting)/26*7;
    total_month = (crca * crca_rate)+(fe_mn * fe_mn_rate) + (fe_si * fe_si_rate);
    total_month += (fe_si_mg * fe_si_mg_rate)+(cov_steel*cov_steel_rate);
    total_month += (ramming_steel*ramming_steel_rate)+(bentonite*bentonite_rate);
    total_month += (lustron*lustron_rate)+(sand*sand_rate)+(resin_hardener*resin_hardener_rate);
    total_month += (amine*amine_rate)+(foundry*foundry_rate);
    turn_over_raw_material = total_month *12;
    rm_15_days = (total_month/2);
   
  }
  function calculateRawMaterials()
  {
    var head,incharge,staff,attendants,head_total,incharge_total,staff_total,attendant_count;
    var attendant_total,space_cost,cost_of_capital,total,incharge_no;
    
    head=returnObject(file_lines,"finance","head");
    incharge=returnObject(file_lines,"finance","stores incharge");
    staff=returnObject(file_lines,"finance","stores staff");
    attendants=returnObject(file_lines,"finance","attendants");
    /*if($('input[name="level_0"]:checked').val().trim()!="level0")
    {
      incharge_no=1;
    }
    else{
      incharge_no=0;
    }*/
    attendant_count=parseInt(staff.nos)+parseInt(incharge.nos);
    head_total=(head.monthly_capacity*12)*head.nos;
    incharge_total=(incharge.monthly_capacity*12)*(parseInt(incharge.nos)+1);
    staff_total=(staff.monthly_capacity*12)*(staff.nos);
    attendant_count = parseInt(attendant_count) - parseInt(1);
    attendant_total=parseInt(attendant_count) * (attendants.monthly_capacity);
    total_staff_store = parseFloat(head_total) + parseFloat(incharge_total) + parseFloat(staff_total) + parseFloat(attendant_total);
    space_cost=calcualteSpaceCostRawmaterial()*cost*12;
    cost_of_capital = rm_15_days*(12/100);
    total=parseFloat(total_staff_store) + parseFloat(space_cost) + parseFloat(cost_of_capital) + parseFloat(depriciation);
    remaining_attendants = parseInt(attendants.nos) ;


    raw_material_mark_up=(total/turn_over_raw_material)*100;
    
  /*  var table_start="<table id='raw_material_foundry' class='table table-bordered table-hover well'>";
    var table_heading="<tr><th colspan='6'>Raw Material</th></tr><tr><th></th><th>Head</th><th>Incharge</th><th>Staff</th><th>Attendants</th><th>Per/Year</th></tr>";
    var table_end="</table>"
    
    $("#display_content").append(table_start+table_heading+table_end);
    var table_name="#raw_material_foundry";
    printTable(table_name,"Staff in store",head_total,incharge_total,staff_total,attendant_total,parseInt(total_staff_store));
    printTable(table_name,"Depriciation","-","-","-","-",parseInt(depriciation));
    printTable(table_name,"Space cost@"+cost+"/sq.m","-","-","-","-",parseInt(space_cost));
    printTable(table_name,"Cost of Capitals for 15 days","-","-","-","-",parseInt(cost_of_capital));
    printTable(table_name,"Total","-","-","-","-",parseInt(total));
    printTable(table_name,"Turn Over of Raw Material per year","-","-","-","-",parseInt(turn_over_raw_material));
    printTable(table_name,"Raw Material mark Up %","-","-","-","-",raw_material_mark_up.toFixed(2));
*/

  }
  function calcualteSpaceCostRawmaterial()
  {
    var crca_obj,fe_si_obj,fe_mn_obj,fe_si_mg_obj,cov_steel_obj,bentonite_obj,lustron_obj,sand_obj,resin_obj,hardener_obj,amine_obj;
    var crca=1600,fe_si=72,fe_mn=64,fe_si_mg=144,cov_steel=256,bentonite=400,lustron=400,sand=1600;
    var resin=64,hardener=72,amine=72;
    crca_obj=returnObject(file_lines,"crca","crca");
    fe_si_obj=returnObject(file_lines,"fe-si","fe-si");
    fe_mn_obj=returnObject(file_lines,"fe-mn","fe-mn");
    fe_si_mg_obj=returnObject(file_lines,"fe-si-mg","fe-si-mg");
    cov_steel_obj=returnObject(file_lines,"cov-steel","cov-steel");
    bentonite_obj=returnObject(file_lines,"bentonite","bentonite");
    lustron_obj=returnObject(file_lines,"lustron","lustron");
    sand_obj=returnObject(file_lines,"sand","sand");
    resin_obj=returnObject(file_lines,"resin","resin");
    hardener_obj=returnObject(file_lines,"hardener","hardener");
    amine_obj=returnObject(file_lines,"amine","amine");
    crca=returnSumObject(crca_obj);
    fe_si=returnSumObject(fe_si_obj);
    fe_mn=returnSumObject(fe_mn_obj);
    fe_si_mg=returnSumObject(fe_si_mg_obj);
    cov_steel=returnSumObject(cov_steel_obj);
    bentonite=returnSumObject(bentonite_obj);
    lustron=returnSumObject(lustron_obj);
    sand=returnSumObject(sand_obj);
    resin=returnSumObject(resin_obj);
    hardener=returnSumObject(hardener_obj);
    amine=returnSumObject(amine_obj);
//    console.log(crca+" "+fe_si+" "+fe_mn+" "+fe_si_mg+" "+bentonite+" "+lustron+" "+sand+" "+resin+" "+hardener+" "+amine);
    var space = (parseFloat(crca)+parseFloat(fe_si)+parseFloat(fe_mn)+parseFloat(fe_si_mg)+parseFloat(cov_steel)+parseFloat(bentonite)+parseFloat(lustron)+parseFloat(sand)+parseFloat(resin)+parseFloat(hardener)+parseFloat(amine))/10.76;
  //  console.log(space);
    return space;

  }
  function returnSumObject(object)
  {
    return parseFloat(object.nos)*parseFloat(object.monthly_capacity);
  }
  function calcualtePurchaseGoods()
  {
    //var purchase_staff=returnObject(file_lines,"finance","purchase staff");
    var attendants=returnObject(file_lines,"finance","attendants");
   // var purchase=purchase_staff.nos*(purchase_staff.monthly_capacity*12);
   purchase_parts_expenses=findMonthlyCapacity(file_lines,"purchase_expense");
   $("#expenses").val(purchase_parts_expenses);
    var attendant_total=attendants.monthly_capacity*12;
    var total_staff_store=attendant_total;
    var space_cost=calcualteSpaceCostPurchaseGood();
    var cost_of_capital=findMonthlyCapacity(file_lines,"purchase_expense")*(12/100);
    var total=total_staff_store+space_cost+cost_of_capital;
    var turn_over_purchase_good=purchase_parts_expenses*12;
    purchased_good_material_mark_up=(total/turn_over_purchase_good)*100;
    var interest=$("#interest").val()/12;
    var interest_45_days = interest*1.5;
    purchased_parts_material_mark_up = interest_45_days+purchased_good_material_mark_up;
    /*var table_start = "<table id='purchase_goods' class='table table-bordered table-hover well'>";
    var table_heading="<tr><th colspan='6'>Purchased Goods</th></tr><tr><th></th><th>Head</th><th>Incharge</th><th>Staff</th><th>Attendants</th><th>Per/Year</th></tr>";
    var table_end="</table>";
    $("#display_content").append(table_start+table_heading+table_end);
    var table_name = "#purchase_goods";
    printTable(table_name,"Staff in Store","-","-","-",attendant_total,total.toFixed(2));
    printTable(table_name,"Depricitaion","-","-","-","-",0);
    printTable(table_name,"Space Cost @"+cost+"/sp.m","-","-","-","-",parseInt(space_cost).toFixed(2));
    printTable(table_name,"Cost of Capitals for 15 days","-","-","-","-",parseInt(cost_of_capital).toFixed(2));
    printTable(table_name,"Total","-","-","-","-",total.toFixed(2));
    printTable(table_name,"Turn Over On Purchased Goods","-","-","-","-",turn_over_purchase_good.toFixed(2));
    printTable(table_name,"Purchased Parts Material Mark up in %","-","-","-","-",purchased_good_material_mark_up.toFixed(2));
    printTable(table_name,"Profit %@45 days payment","-","-","-","-",interest_45_days.toFixed(2));
    printTable(table_name,"Total","-","-","-","-",purchased_parts_material_mark_up.toFixed(2));*/
  }
  function calcualteSpaceCostPurchaseGood()
  {
    var total=1200/10.76;
    return total*cost*12;
  }
  function printTable(table_name,name,head,incharge,staff,attendants,total)
  {
    var table_data_start="<td>";
    var table_data_end="</td>";
    $(table_name).append("<tr></tr>");
    var table_last_row=table_name+" tr:nth-last-child(1)";
    $(table_last_row).append(table_data_start+name+table_data_end);
    $(table_last_row).append(table_data_start+head+table_data_end);
    $(table_last_row).append(table_data_start+incharge+table_data_end);
    $(table_last_row).append(table_data_start+staff+table_data_end);
    $(table_last_row).append(table_data_start+attendants+table_data_end);
    $(table_last_row).append(table_data_start+total+table_data_end);
  }
  function plantOverHeadCost()
  {
    var production_monthly_capacity,qa_monthly_capacity,maintenance_monthly_capacity,supervisor,direct_production;
    var total_production=0,total_qa=0,total_maintenance=0,total_annual_income=0,total_power_cost,total_space_cost,total,space;

    production_monthly_capacity=findMonthlyCapacity(file_lines,"production");
    production_nos=findNos(file_lines,"production");
    qa_monthly_capacity=findMonthlyCapacity(file_lines,"qa/qc");
    qa_nos=findNos(file_lines,"qa/qc");
    maintenance_monthly_capacity=findMonthlyCapacity(file_lines,"maintenance");
    maintenance_nos=findNos(file_lines,"maintenance");
    supervisor=returnObject(file_lines,"direct_labour","supervisor");
    direct_production=supervisor.monthly_capacity*supervisor.nos*12;
    direct_production = direct_production*12;
    space=calcualteSpaceCostRawmaterial();
        var space_cost=parseFloat(getResultfromSpec(power_file,"factory-area"))-parseFloat(space);
    total_production = calculateTotal(production_nos,production_monthly_capacity);
    total_qa = calculateTotal(qa_nos,qa_monthly_capacity);
    total_maintenance = calculateTotal(maintenance_nos,maintenance_monthly_capacity);
    calculateSpec();
    calculatePowerCost();
    total_annual_income = (total_production*12)+(total_qa*12)+(total_maintenance*12);
    total_power_cost=(power_cost/parseFloat(yield)).toFixed(2)*(capacity/1000)*12*unit;
    total_space_cost=space_cost*cost*12;
    total = total_man_power_cost+total_depriciation+total_power_cost+total_space_cost;
    total_plant_overhead = total;
    plant_overhead = (total_annual_income/total)*100;
   /* console.log(space_cost);
    console.log(production_monthly_capacity);
    console.log(maintenance_monthly_capacity);
    console.log(qa_monthly_capacity);
    console.log(total_production);
    console.log(total_qa);
    console.log(total_maintenance);
    console.log("Total Annual Income"+total_annual_income);
    console.log("Total Man Power Cost"+total_man_power_cost);
    console.log("Total Decpriciation"+total_depriciation);
    console.log("Power Cost"+power_cost);
    console.log("total Power Cost"+total_power_cost);
    console.log("Total Space Cost"+total_space_cost);
    console.log("Total"+total);
    console.log("Over Head"+plant_overhead);*/
  }
  function calcualteAdministrativeOverhead()
  {
    var md,plant,hr,design,marketing,depriciation,power,space,finance,strategy,office_attendants,attendant,attendants_total;
    var hr_total,hr_total_monthly_capacity=0,hr_nos,design_nos,design_total=0,marketing_nos,marketing_total,strategy_nos,strategy_total;
    var office_attendants_nos,office_attendants_total,total,sub_total,sub_total_1;
    
    md= returnObject(file_lines,"director","director").monthly_capacity*12;
    plant= returnObject(file_lines,"director","plant").monthly_capacity*12;
    
    attendant = returnObject(file_lines,"director","attendants");
    attendants_total=parseInt(attendant.nos)*parseFloat(attendant.monthly_capacity);
    
    hr = findMonthlyCapacity(file_lines,"human_resource");
    hr_nos = findNos(file_lines,"human_resource");
    
    design = findMonthlyCapacity(file_lines,"design");
    design_nos = findNos(file_lines,"design");
    
    marketing = findMonthlyCapacity(file_lines,"marketing");
    marketing_nos = findNos(file_lines,"marketing");
    
    strategy = findMonthlyCapacity(file_lines,"strategy_planning");
    strategy_nos = findNos(file_lines,"strategy_planning");
    
    office_attendants = findMonthlyCapacity(file_lines,"other_indirect_labour");
    office_attendants_nos = findNos(file_lines,"other_indirect_labour");
    
    design_total = calculateTotal(design_nos,design)*12;
    hr_total_monthly_capacity = calculateTotal(hr_nos,hr);
    marketing_total=calculateTotal(marketing_nos,marketing)*12;
    strategy_total = calculateTotal(strategy_nos,strategy)*12;
    hr_total=parseFloat(attendants_total)+parseFloat(hr_total_monthly_capacity*12);
    
    space = parseFloat(getResultfromSpec(power_file,"sga"))
    depriciation = space*cost*(7/100);
    office_attendants_total= (parseFloat(calculateTotal(office_attendants_nos,office_attendants))*12)+(parseFloat(attendants_total)*12);
    
    finance = calculateFinance();
    sub_total = parseFloat(md) + parseFloat(plant) + parseFloat(hr_total) + parseFloat(design_total) + parseFloat(marketing_total) ;
    sub_total_1 = parseFloat(finance) + parseFloat(strategy_total) + parseFloat(office_attendants_total); 
    space_cost = space * cost*12;
    power = (parseFloat(power_melting_loss)/parseFloat(yield).toFixed(2))*(capacity/1000)*12*unit;
    total = sub_total + depriciation + sub_total_1 + space_cost +power;
    manufacturing_cost = calculateManufacturingCost();
    sga_overhead = parseFloat(total/manufacturing_cost)*100
 /*   
console.log("MD "+md);

    console.log("Plant "+plant);
    console.log("HR "+hr_total);
    console.log("Design "+design_total);
    console.log("Marketing "+marketing_total);
    console.log("Depriciation "+depriciation);
    console.log("Finance "+finance);
    console.log("Strategy "+strategy_total);
    console.log("Office Attendants "+office_attendants_total);
    console.log("power before"+(parseFloat(power_melting_loss)/parseFloat(yield).toFixed(2))*(capacity/1000)*12);
    console.log("Power "+power);
    console.log("Space ="+space);
    console.log("Space "+space_cost);
    console.log("Total1 "+sub_total);
    console.log("Total2 "+sub_total_1);
    console.log("Manufacturing "+manufacturing_cost);
    console.log("sga_overhead "+sga_overhead);*/

  }
  function calculateFinance()
  {
      var account_incharge,account_incharge_total,purchase_incharge,purchase_incharge_total,excise_incharge,excise_incharge_total;
      var account_staff,account_staff_total,excise_staff,excise_staff_total,attendants,total_nos,total_attendants,finance,purchase_staff;
      
      account_incharge = returnObject(file_lines,"finance","accounts incharge");
      if(account_incharge===undefined)
      {
        var obj;
        obj={
          ID: 0,
          designation: "account incharge",
          nos: 0,
          monthly_capacity: 0,
          type: "finance"
        };
        account_incharge=obj;
      }
      purchase_incharge = returnObject(file_lines,"finance","purchase incharge");
      excise_incharge = returnObject(file_lines,"finance","excise incharge");
      if(excise_incharge===undefined)
      {
        var obj;
        obj={
          ID: 0,
          designation: "excise incharge",
          nos: 0,
          monthly_capacity: 0,
          type: "finance"
        };
        excise_incharge=obj;
      }
      account_staff = returnObject(file_lines,"finance","accounts staff");
      excise_staff = returnObject(file_lines,"finance","excise staff");
      purchase_staff = returnObject(file_lines,"finance","purchase staff");
      attendants = returnObject(file_lines,"finance","attendants");
      
      account_incharge_total = parseFloat(account_incharge.monthly_capacity);
      purchase_incharge_total = parseFloat(purchase_incharge.monthly_capacity);
      excise_incharge_total = parseFloat(excise_incharge.monthly_capacity);
      account_staff_total =  parseFloat(account_staff.monthly_capacity);
      purchase_staff_total =  parseFloat(purchase_staff.monthly_capacity);
      excise_staff_total = parseFloat(excise_staff.monthly_capacity);
      
      total_nos = parseInt(account_incharge.nos) + parseInt(purchase_incharge.nos) + parseInt(excise_incharge.nos) + parseInt(account_staff.nos) +parseInt(excise_staff.nos);
    total_attendants = remaining_attendants * parseFloat(attendants.monthly_capacity);
      finance = (account_incharge_total+purchase_incharge_total+excise_incharge_total+account_staff_total+excise_staff_total+purchase_staff_total)*12+total_attendants;
  /*    console.log(account_incharge_total);
      console.log(purchase_incharge_total);
      console.log(excise_incharge_total);
      console.log(account_staff_total);
      console.log(purchase_staff_total);
      console.log(excise_staff_total);*/
    return finance;
  }
  function calculateManufacturingCost()
  {
    var machine_cost,labour_cost,plant_over_head,total,total_machine_cost=0;
    machine_cost = getResultfromSpec(spec_file,"investment_machine_cost_year");
    labour_cost = total_man_power_cost;
    plant_over_head = total_plant_overhead;
    $.each(machine_cost,function(key,value){
          if(value!="")
          {
          total_machine_cost += parseFloat(value);
          }
      
    });
    total = parseFloat(total_machine_cost) + parseFloat(labour_cost) + parseFloat(plant_over_head);
  /* console.log("manu "+total);
    console.log("machine "+machine_cost);
    console.log("total_mac "+total_machine_cost);
    console.log("final "+total);
    console.log("labour_cost "+labour_cost);
    console.log("plant "+plant_over_head);*/
    return total;
  }
  function calculateTotal(nos,capacity)
  {
    var total=0;
    $.each(capacity,function(key,value){
      total+=(parseFloat(value)*parseInt(nos[key]));;
    });
    return total;
  }
  function calculateValues()
  {
    purchase_parts_expenses=$("#expenses").val();
      cost=$("#space_cost").val();
      designation = findDesignation(file_lines,"director");
      monthly_capacity = findMonthlyCapacity(file_lines,"director");
      nos = findNos(file_lines,"director");
      total_man_power_cost = manPowerCost(file_lines);
      capacity=findMonthlyCapacity(file_lines,"capacity");
      good_casting_production = capacity * 12;
    //  console.log("capacitys:"+capacity);
      man_power_cost_good_casting = total_man_power_cost / good_casting_production;
      yield=$("#yield").val()/100;
      year = $("#year").val()
      if(year>2015)
      {
        var diff=parseInt(year) - 2015;
        year_val = (5/100)*diff;
      }
      else if(year<2015)
      {
        var diff=2015 - parseInt(year);
        year_val = (5/100)*diff;
      }
  }
  function inferFile()
  {
    calculateValues();
    var production_monthly_capacity=findMonthlyCapacity(file_lines,"production");
    var qa_monthly_capacity=findMonthlyCapacity(file_lines,"qa/qc");
    var maintenance_monthly_capacity=findMonthlyCapacity(file_lines,"maintenance");
    var supervisor=returnObject(file_lines,"direct_labour","supervisor");
    var direct_production=supervisor.monthly_capacity*supervisor.nos*12;
    capacity  = findMonthlyCapacity(file_lines,"capacity");
    depriciation = calculateDepriciation();
    calculateFoundryRawMaterial(capacity);
    calculateRawMaterials();
    calcualtePurchaseGoods();
    plantOverHeadCost();
    calcualteAdministrativeOverhead();
    calcualteGoodCastingCost();
    calculateDICVGoodCastingCost();
  }
  function getResultfromSpec(spec_file,type)
  {
    var return_data=[];
    $.each(spec_file,function(key,value){
      return_data.push(getFieldData(type,value));
    });
 //   console.log(return_data); 
    return return_data;
  }
  function getFieldData(field,record)
  {
    var return_data;
    $.each(record,function(key,value){
      if(key==field)
       {
        return_data=value;
       }
    })
    return return_data;
  }
  function calculateSpec()
  {
    var space_cost = getResultfromSpec(spec_file,"space_cost_per_year");
    var spec_process = getResultfromSpec(spec_file,"spec_process");
    $.each(spec_process,function(key,value){
      if(value.toLowerCase().indexOf("melting") >=0 )
      {
        total_depriciation+=parseFloat(space_cost[key]);
      }
      else if(value.toLowerCase().indexOf("sand") >=0 ) 
      {
        total_depriciation+=parseFloat(space_cost[key]);
      }
      else if(value.toLowerCase().indexOf("moulding") >=0 ) 
      {
        total_depriciation+=parseFloat(space_cost[key]);
      }
      else if(value.toLowerCase().indexOf("core") >=0 ) 
      {
        total_depriciation+=parseFloat(space_cost[key]);
      }
    });
 //   console.log(total_depriciation);
  }
  function calculatePowerCost()
  {
    $.each(power_file,function(key,value){
      if(JSON.stringify(value.power_area_of_operation).toLowerCase().replace(/\"/g,'').indexOf("total") >=0)
      {
        power_cost = parseFloat(value.power_melting_loss).toFixed(2);
      }
      if(JSON.stringify(value.power_state).toLowerCase().replace(/\"/g,'').replace("\s+","").indexOf($("#state :selected").data("name")) >=0)
      {
        unit=parseFloat(value.power_eb_unit);
        private_rate = parseFloat(value.power_private_tower);
      }
      if(JSON.stringify(value.power_machine).toLowerCase().replace(/\"/g,'').indexOf("admin building") >=0)
      {
        power_melting_loss = value.power_melting_loss;
      }
    });
  }
  function createInputFile(file_lines)
  {
    file_lines=[];
    file_lines=this.file_lines;
  }
  function createSpecFile(spec_file)
  {
    spec_file=[];
    spec_file = this.spec_file;
  }
  function createPowerFile(power_file)
  {
    power_file=[]
    power_file=this.power_file;
  }
  
  function calcualteGoodCastingCost()
  {
    power_cost = calculatePowerCostPerKg();
    melting_cost = getSpecificData(spec_file,"melting","good_casting_cost");
    moulding_machine_cost = getSpecificData(spec_file,"moulding","good_casting_cost");
    mould_cost = sand_cost_per_kg;
    consumable_cost = 1/capacity*findMonthlyCapacity(file_lines,"purchase_expense");
    labour_cost = man_power_cost_good_casting;
    
    core_cost = (($("#core_weight").val()*total_cost_core_sand)/$("#cast_value").val())+parseFloat(getSpecificData(spec_file,"core","good_casting_cost"));
    shot_blasting = getSpecificData(spec_file,"shotblast","good_casting_cost");
    sub_total_cost =parseFloat(power_cost)+parseFloat(melting_cost)+parseFloat(moulding_machine_cost)+parseFloat(consumable_cost);
    sub_total_cost+= parseFloat(mould_cost)+parseFloat(core_cost)+parseFloat(labour_cost)+parseFloat(shot_blasting);
    icc_rm = (parseFloat(total_metallic_cost)+parseFloat(core_cost)+parseFloat(mould_cost))*(2/100);
    plant_overhead_rm = sub_total_cost*(5/100);
    sga_rm = (parseFloat(sub_total_cost)+parseFloat(plant_overhead_rm))*(5/100);
    profit_rm = (parseFloat(total_metallic_cost)+parseFloat(mould_cost)+parseFloat(core_cost))*(1/100);
    profit_manufacturing_cost = sub_total_cost*(10/100);
    rejection_percent = parseFloat($("#rejection").val()).toFixed(2);
    raw_material=parseFloat(mould_cost)+parseFloat(core_cost)+parseFloat(total_metallic_cost);
    rejection = ((parseFloat(power_cost)+parseFloat(raw_material))*(rejection_percent/100));
    final_total = parseFloat(total_metallic_cost)+parseFloat(sub_total_cost)+parseFloat(icc_rm)+parseFloat(plant_overhead_rm);
    final_total+= parseFloat(sga_rm)+parseFloat(profit_rm)+parseFloat(profit_manufacturing_cost)+parseFloat(rejection);
    total_machine_cost_good_Casting = parseFloat(moulding_machine_cost)+parseFloat(melting_cost)+parseFloat(shot_blasting);
    raw_casting_cost=parseFloat(final_total)*parseFloat($("#cast_value").val());
    casting_cost=parseFloat(raw_casting_cost)-((parseFloat($("#cast_value").val())-parseFloat($("#get_weight").val()))*21*(0.85));
    ed_cost=$('div [data-type="ed_coating"]').data("cost")*parseFloat($("#surface_area").val());
    total_part_cost=parseFloat(casting_cost)+parseFloat(ed_cost);
    other_cost=parseFloat(icc_rm)+parseFloat(sga_rm)+parseFloat(plant_overhead_rm)+parseFloat(profit_rm)+parseFloat(rejection)+parseFloat(profit_manufacturing_cost);
    $("#display_content #display_good_cast").append("<h3 id='head_good_casting' class='text-center' style='width:500px'>Cost /Kg of good Casting</h3>");
    $("#display_content #display_good_cast").append("<table class='table table-bordered table-hover well test' id='cost_good_casting' style='width:500px'>");
    $("#display_content #cost_good_casting").append("<tr><th>Material</th><th>Value (INR/Kg)</th></tr></table>");
    var table_name="#cost_good_casting";
    printGoodCastingTable(table_name,"Metallic Cost",parseFloat(total_metallic_cost).toFixed(2));
    //printGoodCastingTable(table_name,"Melting F/c Cost",parseFloat(melting_cost).toFixed(2));
    //printGoodCastingTable(table_name,"Moulding M/c Cost",parseFloat(moulding_machine_cost).toFixed(2));
    printGoodCastingTable(table_name,"Mould R/M Cost",parseFloat(mould_cost).toFixed(2));
    printGoodCastingTable(table_name,"Core R/M Cost",parseFloat(core_cost).toFixed(2));
    printGoodCastingTable(table_name,"Raw Material Cost (INR)",parseFloat(raw_material).toFixed(2));
    printGoodCastingTable(table_name,"Power Cost",parseFloat(power_cost).toFixed(2));
    printGoodCastingTable(table_name,"Machine Cost",parseFloat(total_machine_cost_good_Casting).toFixed(2));
    printGoodCastingTable(table_name,"Labour Cost",parseFloat(labour_cost).toFixed(2));
    printGoodCastingTable(table_name,"Purchased parts Cost",parseFloat(consumable_cost).toFixed(2));
    
    //printGoodCastingTable(table_name,"Shot Blasting",parseFloat(shot_blasting).toFixed(2));
    printGoodCastingTable(table_name,"Conversion Cost (INR)",parseFloat(sub_total_cost).toFixed(2));
    printGoodCastingTable(table_name,"ICC on RM @2%",parseFloat(icc_rm).toFixed(2));
    printGoodCastingTable(table_name,"Plant OverHead @ 5%",parseFloat(plant_overhead_rm).toFixed(2));
    printGoodCastingTable(table_name,"SGA @5%",parseFloat(sga_rm).toFixed(2));
    printGoodCastingTable(table_name,"Profit on RM @1%",parseFloat(profit_rm).toFixed(2));
    printGoodCastingTable(table_name,"Profit on Manufacturing Cost @10%",parseFloat(profit_manufacturing_cost).toFixed(2));
    printGoodCastingTable(table_name,"Rejection @"+rejection_percent+"%",parseFloat(rejection).toFixed(2));
    printGoodCastingTable(table_name,"Other Cost(INR) ",parseFloat(other_cost).toFixed(2));
    printGoodCastingTable(table_name,"Casting Cost/Kg ",parseFloat(final_total).toFixed(2));
    printGoodCastingTable(table_name,"Casting Cost ",parseFloat(casting_cost).toFixed(2));
    printGoodCastingTable(table_name,"ED Coating Cost (Per Sq.m)  ",parseFloat(ed_cost).toFixed(2));
    printGoodCastingTable(table_name,"Total Part Cost (INR) ",parseFloat(total_part_cost).toFixed(2));

  }
  function calculatePowerCostPerKg()
  {
    var unit_good_casting,eb_percent,private_percent,eb_unit,eb_rate,private_unit,private_tower_rate,total_power_cost;
    unit_good_casting = power_cost / yield;
    eb_percent = $("#eb_power").val()/100;
    private_percent = $("#private_power").val()/100;
    eb_unit = eb_percent * unit_good_casting;
    private_unit = private_percent * unit_good_casting;
    eb_rate = unit;
    private_tower_rate =private_rate;
    total = (parseFloat(eb_rate * eb_unit) + parseFloat(private_tower_rate *private_unit))/1000;
    /*console.log(unit_good_casting = power_cost / yield);
    console.log(eb_unit);
    console.log(private_unit);
    console.log(parseFloat(eb_rate * eb_unit));
    console.log(parseFloat(private_tower_rate *private_unit));
    console.log(total);*/
    return total;
  }
  function getSpecificData(file,search,result)
  {
    var return_data;
    $.each(file,function(key,value){
      if(JSON.stringify(value.spec_process).toLowerCase().replace(" ","").replace(/\"/g,'').indexOf(search) >=0)
      {
        $.each(value,function(keys,values){
          if(keys===result)
          {
            return_data=parseFloat(values);
          }

        });
      }

    });
    return return_data;
  }
  function calculateDICVGoodCastingCost()
  {
    var dicv_metallic,dicv_mould,dicv_core,dicv_purchased,dicv_sub_total_cost,overall_profit,yield_variation,volume_variation,dicv_profit_on_rm;
    var dicv_machine_cost=0,dicv_labour_cost,dicv_plant_overhead,total_cost,dicv_sga,dicv_sub_total_1,dicv_rm_markup,dicv_purchased_parts,dicv_raw_material,dicv_rejection;
    dicv_metallic = parseFloat(total_metallic_cost).toFixed(2);
    dicv_mould = parseFloat(mould_cost).toFixed(2);
    dicv_purchased = parseFloat(consumable_cost).toFixed(2);
    dicv_core = parseFloat(core_cost).toFixed(2);
    dicv_raw_material = parseFloat(dicv_metallic)+parseFloat(dicv_mould)+parseFloat(dicv_core);
    dicv_sub_total_cost = parseFloat(dicv_metallic)+parseFloat(dicv_mould)+parseFloat(dicv_purchased)+parseFloat(dicv_core);
    var temp_cost = getResultfromSpec(spec_file,"good_casting_cost");
    $.each(temp_cost,function(key,value){
      if(value != "")
      {
        dicv_machine_cost+=parseFloat(value);
      }
    });
   // console.log("sub total"+dicv_sub_total_cost);
    //console.log(dicv_machine_cost);
    dicv_labour_cost = labour_cost;
    dicv_plant_overhead= (parseFloat(dicv_machine_cost)+parseFloat(dicv_labour_cost))*(plant_overhead/100);
    dicv_sga=(parseFloat(dicv_machine_cost)+parseFloat(dicv_labour_cost)+parseFloat(dicv_plant_overhead))*(sga_overhead.toFixed(2)/100);
    dicv_sub_total_1 = parseFloat(dicv_machine_cost)+parseFloat(dicv_labour_cost)+parseFloat(dicv_plant_overhead)+parseFloat(dicv_sga);
    dicv_rm_markup = parseFloat(dicv_raw_material).toFixed(2)*(raw_material_mark_up/100);
    dicv_purchased_parts = dicv_purchased*(purchased_parts_material_mark_up/100);
    dicv_profit_on_rm = parseFloat(dicv_raw_material)*(1/100);
    overall_profit = (parseFloat(dicv_machine_cost)+parseFloat(dicv_labour_cost)+parseFloat(dicv_plant_overhead))*(10/100);
    dicv_rejection = (parseFloat(dicv_raw_material)+parseFloat(power_cost));
    rejection_percent = parseFloat($("#rejection").val()).toFixed(2);
    dicv_rejection= dicv_rejection*(rejection_percent/100);
    /*final_total = parseFloat(dicv_sub_total_cost)+parseFloat(dicv_machine_cost)+parseFloat(dicv_labour_cost)+parseFloat(dicv_plant_overhead);
    final_total+= parseFloat(dicv_sga)+parseFloat(dicv_rm_markup)+parseFloat(dicv_purchased_parts)+parseFloat(overall_profit);*/
    final_total = parseFloat(dicv_raw_material)+parseFloat(power_cost)+parseFloat(dicv_purchased_parts)+parseFloat(dicv_machine_cost)+parseFloat(dicv_labour_cost)+parseFloat(dicv_plant_overhead);
    final_total+= parseFloat(dicv_sga)+parseFloat(dicv_rm_markup)+parseFloat(dicv_profit_on_rm)+parseFloat(dicv_purchased_parts)+parseFloat(overall_profit)+parseFloat(dicv_rejection);
    yield_variation = dicv_metallic * (10/100);
    volume_variation = dicv_sub_total_cost *(5/100);
    raw_casting_cost=parseFloat(final_total)*parseFloat($("#cast_value").val());
    casting_cost=parseFloat(raw_casting_cost)-((parseFloat($("#cast_value").val())-parseFloat($("#get_weight").val()))*21);
    ed_cost=$('div [data-type="ed_coating"]').data("cost")*parseFloat($("#surface_area").val());
    total_part_cost=parseFloat(casting_cost)+parseFloat(ed_cost);
   /* console.log("dicv sga "+dicv_sga);
    console.log("dicv plant_overhead "+dicv_plant_overhead);
    console.log("dicv rm markup"+dicv_rm_markup);
    console.log("overall_profit "+overall_profit);
    console.log("final "+final_total);
    console.log(dicv_purchased_parts);
    console.log(yield_variation);
    console.log(volume_variation);*/

    $("#display_content #display_dicv_good_cast").append("<h3 id='head_dicv' class='text-center'>DICV Cost /Kg of good Casting</h3>");
    $("#display_content #display_dicv_good_cast").append("<table class='table table-bordered table-hover well test' id='dicv_cost_good_casting'>");
    $("#display_content #dicv_cost_good_casting").append(" <tr><th>Material</th><th>Value</th></tr></table>");
    var table_name="#dicv_cost_good_casting";
    printGoodCastingTable(table_name,"Raw Material Cost",parseFloat(dicv_raw_material).toFixed(2));
    printGoodCastingTable(table_name,"Purchased parts Cost",parseFloat(dicv_purchased).toFixed(2));
    printGoodCastingTable(table_name,"Machine Cost",parseFloat(dicv_machine_cost).toFixed(2));
    printGoodCastingTable(table_name,"Labour Cost",parseFloat(labour_cost).toFixed(2));
    printGoodCastingTable(table_name,"Power Cost",parseFloat(power_cost).toFixed(2));
    printGoodCastingTable(table_name,"Misc Plant OverHead @"+parseInt(parseInt(plant_overhead)+0.5)+"%",parseFloat(dicv_plant_overhead).toFixed(2));
    printGoodCastingTable(table_name,'SGA @'+parseInt(parseInt(sga_overhead)+0.5)+"%",parseFloat(dicv_sga).toFixed(2));
    printGoodCastingTable(table_name,"RM Markup @"+parseInt(parseInt(raw_material_mark_up)+0.5)+"%",parseFloat(dicv_rm_markup).toFixed(2));
    printGoodCastingTable(table_name,"Purchased Parts Mark Up",parseFloat(dicv_purchased_parts).toFixed(2));
    printGoodCastingTable(table_name,"Profit on Rm @1%",parseFloat(dicv_profit_on_rm).toFixed(2));
    printGoodCastingTable(table_name,"Profit on Manufacturing Cost @10%",parseFloat(overall_profit).toFixed(2));
    printGoodCastingTable(table_name,"Rejection @"+rejection_percent+"%",parseFloat(dicv_rejection).toFixed(2));
    printGoodCastingTable(table_name,"Casting Cost Per Kg",parseFloat(final_total).toFixed(2));
    printGoodCastingTable(table_name,"Casting Cost ",parseFloat(casting_cost).toFixed(2));
    printGoodCastingTable(table_name,"ED Coating Cost (Per Sq.m)  ",parseFloat(ed_cost).toFixed(2));
    printGoodCastingTable(table_name,"Total Part Cost(INR) ",parseFloat(total_part_cost).toFixed(2));
  }
//});
  
//});
