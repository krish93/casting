
    var crca_value,pig_iron_value,foundry_value,grade,type,copper_percentage,carbon_percentage,silicon_percentage,manganese_percentage,crca_qty,pig_iron_qty,foundry_qty,total_qty;
   var crca_carbon_percentage,crca_silicon_percentage,crca_manganese_perentage,crca_copper_percentage;
   var pig_iron_carbon_percentage=0,pig_iron_silicon_percentage=0,pig_iron_manganese_percentage=0,pig_iron_copper_percentage=0;
   var foundry_carbon_percentage,foundry_silicon_percentage,foundry_manganese_percentage,foundry_copper_percentage;
   var calculated_copper_percentage,calculated_carbon_percentage,calculated_silicon_percentage,calculated_manganese_percentage;
   var recovery = [], cost = [],material = [], quantity = [];
   var graphite_qty,copper_qty,coke_qty,fe_si_qty,fe_mn_qty;
   var cavity = [],casting_length = [],casting_breadth = [],casting_height = [],box_length = [],box_breadth = [],box_cope_height = [],box_drag_height = [],sand_cost = [],sand_material = [],no_of_box = [],sand_requirement = [],new_sand = [], bentonite = [],lustron = [],pouring_weight = [];
   var new_sand_qty,bentonite_qty,lustron_qty,lm=[],sand_yield=62,good_casting=[],sand_cost_per_kg=[],total_cost = [],sand_qty = [];
   var washed_sand_qty,resin_qty,hardener_qty,amine_qty,total_qty,cold_material = [],cold_cost = [],washed_cost,resin_cost,hardener_cost,amine_cost,total_cost;
   function getpercentageCrca()
   {
       if($("#crca").is(":checked"))
       {
       crca_carbon_percentage = parseFloat($('div [data-grade="crca"]').data("carbon"));
       crca_silicon_percentage = parseFloat($('div [data-grade="crca"]').data("silicon"));
       crca_manganese_perentage = parseFloat($('div [data-grade="crca"]').data("manganese"));
       crca_copper_percentage = parseFloat($('div [data-grade="crca"]').data("copper"));
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
       }
   }
   
   function calculateCarbonWeight()
   {
       
       var carbon_weight=(crca_qty*(crca_carbon_percentage/100))+(pig_iron_qty*(pig_iron_carbon_percentage/100))+(foundry_qty*(foundry_carbon_percentage/100));
       console.log("carbon_weight"+carbon_weight);
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
   function getValue()
   {
        var rec = $('div [data-type="sg_iron"]');
        $.each(rec,function(key,value){
           recovery.push($(this).data("recovery"));
           material.push($(this).data("material"));
           cost.push($(this).data("cost"));
        });
        console.log(material);
   }
   function calculateQty(carbon_weight_percentage,silicon_weight_percentage,managnese_weight_percentage,copper_weight_percentage)
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
           if(material[i].trim() =="graphite")
           {
               graphite_qty = (carbon_percentage - carbon_weight_percentage)*total_qty/recovery[i];
               if(graphite_qty < 0)
               {
                   graphite_qty = 0;
               }
               quantity.push(graphite_qty);
           }
           else if(material[i].trim() =="copper")
           {
               copper_qty = (copper_percentage - copper_weight_percentage)*total_qty/recovery[i];
               if(copper_qty < 0)
               {
                   copper_qty = 0;
               }
               quantity.push(copper_qty);
           }
           else if(material[i].trim() =="coke")
           {
               coke_qty = (carbon_percentage - carbon_weight_percentage)*total_qty/recovery[i];
               if(coke_qty < 0)
               {
                   coke_qty = 0;
               }
               quantity.push(coke_qty);
           }
           else if(material[i].trim() =="fe-si")
           {
               fe_si_qty = (silicon_percentage - silicon_weight_percentage)*total_qty/recovery[i];
               if(fe_si_qty < 0)
               {
                   fe_si_qty = 0;
               }
               quantity.push(fe_si_qty);
           }
           else if(material[i].trim() =="fe-mn")
           {
               fe_mn_qty = (manganese_percentage - managnese_weight_percentage )*total_qty/recovery[i];
               if(fe_mn_qty < 0)
               {
                   fe_mn_qty = 0;
               }
               quantity.push(fe_mn_qty);
           }
       }
       
       
   }
   function getRawMaterialCost()
   {
      var crca_rate,pig_iron_rate,foundry_rate;
      console.log("raw material");
      grade = $("#grade").val().trim();
      type = $('input[name="iron"]:checked').val();
      total_qty = $("#quantity").val();
      total_qty = parseFloat(total_qty);
      carbon_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("carbon"));
      silicon_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("silicon"));
      manganese_percentage = parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("manganese"));
      copper_percentage= parseFloat($('div [data-type="'+type+'"],[data-grade="'+grade+'"]').data("copper"));
      crca_qty=total_qty*(60/100);
      crca_qty = parseFloat(crca_qty);
      crca_rate = 31.6;
      getpercentageCrca();
      if($("#pig_iron").is(":checked"))
      {
          pig_iron_qty =total_qty * (10/100);
          foundry_qty =total_qty * (30/100);
          pig_iron_rate = 31.6 ;
          foundry_rate = 31.6 ;
          getPercentagePigIron();
          getPercentageFoundry();
      }
      else
      {
          pig_iron_qty = 0;
          pig_iron_rate = 0;
          foundry_rate = 31.6;
          foundry_qty = total_qty * (40/100);
          getPercentageFoundry();
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
      getValue();
      
      calculateQty(carbon_weight_percentage,silicon_weight_percentage,managnese_weight_percentage,copper_weight_percentage);
      
      $("#display_content").append("<h3 class='text-center' >Raw Material Cost of "+type.toUpperCase().replace("_","")+"</h3>");
      $("#display_content").append("<table class='table table-bordered table-hover' id='raw_material_cost' ><tr><th>"+type.toUpperCase().replace("_"," ")+"</th><th>Grade "+grade+"</th><th>1000</th><th>62%</th></tr>");
      $("#raw_material_cost").append("<tr><th>Material</th><th>Qty(kgs)</th><th>Rs/kg</th><th>Total Cost</th></tr></table>");
      var table_name="#raw_material_cost";
      var crca_cost = parseFloat(crca_qty) * parseFloat(crca_rate);
      var pig_iron_cost = parseFloat(pig_iron_qty) * parseFloat(pig_iron_rate);
      var foundry_cost = parseFloat(foundry_qty) * parseFloat(foundry_rate);
      var temp_cost,sum = parseFloat(crca_cost) + parseFloat(pig_iron_cost) + parseFloat(foundry_cost);
      printRawMaterialTable(table_name,"CRCA",crca_qty.toFixed(2),crca_rate,crca_cost.toFixed(2));
      printRawMaterialTable(table_name,"pig_iron",pig_iron_qty.toFixed(2),pig_iron_rate,pig_iron_cost.toFixed(2));
      printRawMaterialTable(table_name,"Foundry R/R",foundry_qty.toFixed(2),foundry_rate,foundry_cost.toFixed(2));
      printRawMaterialTable(table_name,"Total",total_qty.toFixed(2),"-",sum.toFixed(2));
      $.each(material,function(key,value){
        console.log("calling");
        temp_cost = parseFloat(quantity[key]) * parseFloat(cost[key]);
        sum += parseFloat(temp_cost);
         printRawMaterialTable(table_name,value,quantity[key].toFixed(2),cost[key],temp_cost.toFixed(2)); 
         console.log("called");
      });
      printRawMaterialTable(table_name,"Total","-","-",sum.toFixed(2));
   }
  
  function getSandCost()
  {
    var div = $("#get_box_dimension").children();
    var mixer_qty=$("#sand_mixer").find(":selected").val();
    var box;
    mixer_qty = parseInt(mixer_qty);
    console.log(mixer_qty);
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
      if(value === "new_sand")
      {
        new_sand_qty = mixer_qty*(2/100);
        sand_qty.push(new_sand_qty);
        total_cost.push(parseFloat(new_sand_qty) * parseFloat(sand_cost[key]));
      }
      else if(value === "bentonite")
      {
        bentonite_qty = mixer_qty * (0.8/100);
        sand_qty.push(bentonite_qty);
        total_cost.push(parseFloat(bentonite_qty) * parseFloat(sand_cost[key]));
      }
      else if(value === "lustron")
      {
        lustron_qty = mixer_qty * (0.4/100);
        sand_qty.push(lustron_qty);
        total_cost.push(parseFloat(lustron_qty) * parseFloat(sand_cost[key]));
      }
    });
    $.each(sand_requirement,function(key,value){
              var box=0;
      console.log(value);
      value = parseInt(value);
      for( var i=0;i<parseInt(mixer_qty);i+=value)
      {
        box++;
      }
      no_of_box.push(box); 
    });
    var cast_value = $("#cast_value").val();
    var temp_cost= 0;
    $.each(cavity,function(key,value){
      pouring_weight.push(parseFloat(cast_value));
      var temp_lm = parseFloat(no_of_box)*parseFloat(pouring_weight);
      lm.push(parseFloat(temp_lm));
      var temp_good_casting = parseFloat(lm)*parseFloat(sand_yield/100);
      good_casting.push(temp_good_casting);
      $.each(total_cost,function(key,value){
        temp_cost += parseFloat(value);
      });
      var cost = parseFloat(temp_cost)/parseFloat(temp_good_casting);
      sand_cost_per_kg.push(cost);
    });
    $("#display_content").append("<h3 class='text-center'>Sand Box Cost(Box Size "+$("#box_size").find(':selected').val()+")</h3>");
    $("#display_content").append("<table class='table table-bordered table-hover' id='dis_sand_cost' ><tr><th colspan='4'> For "+mixer_qty+"kgs</th></tr>");
      $("#dis_sand_cost").append("<tr><th>Material</th><th>Qty(kgs)</th><th>Rs/kg</th><th>Total Cost</th></tr></table>");
      var table_name="#dis_sand_cost";
     $.each(sand_cost,function(key,value){
       printRawMaterialTable(table_name,sand_material[key],sand_qty[key],sand_cost[key],total_cost[key].toFixed(2));
     });
     printRawMaterialTable(table_name,"yield %",sand_yield,"-","-");
     printRawMaterialTable(table_name,"LM(kgs)",lm[0].toFixed(2),"-","-");
     printRawMaterialTable(table_name,"Good Casting",good_casting[0].toFixed(2),"-","-");
     printRawMaterialTable(table_name,"Sand Cost Per Kg",sand_cost_per_kg[0].toFixed(2),"-","-");
  }
  
  function getColdBoxCost()
  {
    var core_weight = $("#core_weight").val();
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
      if(value === "washed_sand")
      {
        washed_cost = (parseFloat(washed_sand_qty) * parseFloat(cold_cost[key]));
      }
      else if(value === "resin")
      {
        resin_cost = (parseFloat(resin_qty) * parseFloat(cold_cost[key]));
      }
      else if(value === "hardener")
      {
        hardener_cost = (parseFloat(hardener_qty) * parseFloat(cold_cost[key]));
      }
      else if(value === "amine")
      {
        amine_cost = (parseFloat(amine_qty) * parseFloat(cold_cost[key]));
      }
    });
    total_cost = parseFloat(washed_cost)+parseFloat(resin_cost)+parseFloat(hardener_cost)+parseFloat(amine_cost);
    total_qty = parseFloat(washed_sand_qty)+parseFloat(resin_qty)+parseFloat(hardener_qty)+parseFloat(amine_qty);
    $("#display_content").append("<h3 class='text-center' >Cold Box Core Cost</h3>");
    $("#display_content").append("<table class='table table-bordered table-hover' id='dis_cold_cost' ><tr><th colspan='4'> For "+core_weight+"kgs Sand Mix</th></tr>");
      $("#dis_cold_cost").append("<tr><th>Material</th><th>Qty(kgs)</th><th>Rs/kg</th><th>Total Cost</th></tr></table>");
      var table_name="#dis_cold_cost";
      
      printRawMaterialTable(table_name,"Washed Sand",washed_sand_qty.toFixed(2),cold_cost[0],washed_cost.toFixed(4));
      printRawMaterialTable(table_name,"Resin",resin_qty.toFixed(4),cold_cost[1],resin_cost.toFixed(4));
      printRawMaterialTable(table_name,"Hardener",hardener_qty.toFixed(4),cold_cost[2],hardener_cost.toFixed(4));
      printRawMaterialTable(table_name,"Amine",amine_qty.toFixed(4),cold_cost[3],amine_cost.toFixed(4));
      printRawMaterialTable(table_name,"Total",total_qty.toFixed(4),"-",total_cost.toFixed(4));
  }