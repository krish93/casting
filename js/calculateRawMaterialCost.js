
    var crca_value,pig_iron_value,foundry_value,grade,type,copper_percentage,carbon_percentage,silicon_percentage,manganese_percentage,crca_qty,pig_iron_qty,foundry_qty,total_qty;
   //calculate Raw Material Cost
   var crca_carbon_percentage,crca_silicon_percentage,crca_manganese_perentage,crca_copper_percentage;
   var pig_iron_carbon_percentage=0,pig_iron_silicon_percentage=0,pig_iron_manganese_percentage=0,pig_iron_copper_percentage=0;
   var foundry_carbon_percentage,foundry_silicon_percentage,foundry_manganese_percentage,foundry_copper_percentage;
   var calculated_copper_percentage,calculated_carbon_percentage,calculated_silicon_percentage,calculated_manganese_percentage;
   var recovery = [], cost = [],material = [], quantity = [];
   var graphite_qty,copper_qty,coke_qty,fe_si_qty,fe_mn_qty;
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
       console.log("calculate quantity");
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
      $("#display_content").append("<table class='table table-bordered toable-hover' id='raw_material_cost' ><tr><th>"+type+"</th><th>Grade "+grade+"</th><th>1000</th><th>62%</th></tr>");
      $("#raw_material_cost").append("<tr><th>Material</th><th>Qty(kgs)</th><th>Rs/kg</th><th>Total Cost</th></tr></table>");
      var table_name="#raw_material_cost";
      printRawMaterialTable(table_name,"CRCA",crca_qty,crca_rate);
      printRawMaterialTable(table_name,"pig_iron",pig_iron_qty,pig_iron_rate);
      printRawMaterialTable(table_name,"Foundry R/R",foundry_qty,foundry_rate);
      $.each(material,function(key,value){
         printRawMaterialTable(table_name,value,quantity[key],cost[key]); 
      });
   }
