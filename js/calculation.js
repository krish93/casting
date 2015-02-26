$(function () {
var casting_breadth,casting_length,casting_height,cavity,box_dimension,bentonite,new_sand,lustron,return_sand,type,sand_requirement;
var avl_length,avl_breath,row_count=0,column_count=0,box_size_requirement;
//Get the Box Size
function getBoxSize(length,breadth,cope_height,drag_height)
{
  var div_box_dimension_start="<div class='disp_content' ";
  var div_box_dimension_end="</div>";
  casting_length=$("#casting_length").val();
  casting_breadth=$("#casting_breadth").val();
  casting_height=$("#casting_height").val();
 // box_dimension=$("#length_size").val()+"X"+$("#breadth_size").val()+"X"+$("#cope_height_size").val()+"X"+$("#drag_height_size").val();
   box_dimension = length+"X"+breadth+"X"+cope_height+"X"+drag_height;
  var dimension=box_dimension.split('X').map(Number);
  avl_length=$("#length_size").find(':selected').attr("data-avl-length").trim();
  avl_breadth=$("#breadth_size").find(':selected').attr("data-avl-breadth");
  casting_length=parseInt(casting_length);
  casting_breadth=parseInt(casting_breadth);
  avl_length=parseInt(avl_length);
  avl_breadth=parseInt(avl_breadth);


  cavity = calcualteCavity(parseInt(casting_length),parseInt(casting_breadth),parseInt(avl_length),parseInt(avl_breadth));
  drawDiagram(casting_length,casting_breadth,avl_length,avl_breadth,dimension[0],dimension[1],row_count,column_count,cavity);
  sand_requirement=sandRequirement(casting_length,casting_breadth,casting_height,dimension);
  sand_requirement=parseInt(sand_requirement);
  new_sand = getPercentage(sand_requirement,2);
  bentonite = getPercentage(sand_requirement,0.8);
  lustron = getPercentage(sand_requirement,0.4);
 // console.log(sand_requirement);
  return_sand = (sand_requirement -(new_sand+bentonite+lustron));
  $("#display_jumbotron").show();
  $("#preview_button").show();
  /*var table_start="<table id='box_table' class='table table-bordered table-hover jumbotron shadow-z-2'>";
  var table_heading="<tr><th>New Sand</th><th>Bentonite</th><th>Lustron</th><th>Return Sand</th><th>Preview</th></tr>"
  var table_end="</table>";
  var icon = "<a style='text-decoration:none'><i id='preview'class='glyphicon glyphicon-picture' style='font-size:25px;' data-toggle='modal' data-target='.bs-example-modal-lg'></i></a>"
  $("#display_content").append(table_start+table_heading);
  printRequirementTable("#box_table",new_sand,bentonite,lustron,return_sand,icon);
  $("#box_table").append(table_end);*/
  $("#get_box_dimension").append(div_box_dimension_start+" data-casting-length='"+casting_length+"'"+"data-casting-breadth='"+casting_breadth+"'"+"data-casting-height='"+casting_height+"'"+"data-box-length='"+dimension[0]+"'"+"data-box-breadth='"+dimension[1]+"'"+"data-cope-height='"+dimension[2]+"'"+"data-drag-height='"+dimension[3]+"'"+"data-cavity='"+cavity+"'"+"data-sand-requirement='"+sand_requirement+"'"+"data-new-sand='"+new_sand+"'"+"data-bentonite='"+bentonite+"'"+"data-lustron='"+lustron+"'"+"data-return-sand='"+return_sand+"' data-box-size-requirement='"+box_size_requirement+"' >"+div_box_dimension_end);
}

//Calcualte the Number of Cavity
function calcualteCavity(casting_length,casting_breadth,length,breadth)
{
    var temp_casting_length=casting_length+30;
    var temp_casting_breadth=casting_breadth+30;
    row_count=0,column_count=0;
    temp_casting_length=parseInt(temp_casting_length);
    temp_casting_breadth=parseInt(temp_casting_breadth);
    if(length>temp_casting_length&&breadth>temp_casting_breadth)
    {
      while((length - 30) > temp_casting_length)
      {
          column_count++;
          temp_casting_length+=casting_length+30;
      }
      while((breadth - 30) > temp_casting_breadth)
      {
          row_count++;
          temp_casting_breadth += casting_breadth + 30;
      }
    }
    else if(length<temp_casting_length&&breadth>temp_casting_breadth)
    {
      length=parseInt(length)-30;
      breadth=parseInt(breadth)-30;
      length=Math.sqrt(parseFloat(length*length)+parseFloat(breadth*breadth));
      while((length - 30) > temp_casting_length)
      {
          column_count++;
          temp_casting_length+=casting_length+30;
      }
      /*while((breadth - 30) > temp_casting_breadth)
      {
          row_count++;
          temp_casting_breadth += casting_breadth + 30;
      }*/
    }
    else if(breadth<temp_casting_breadth&&length>temp_casting_length)
    {
      length=parseInt(length)-30;
      breadth=parseInt(breadth)-30;
      length=Math.sqrt(parseFloat(length*length)+parseFloat(breadth*breadth));
      while((breadth - 30) > temp_casting_breadth)
      {
          row_count++;
          temp_casting_breadth += casting_breadth + 30;
      }
    }
    if(row_count === 1 && column_count ==1)
    {
      return row_count;
    }
    //drawDiagram(casting_length,casting_breadth,avl_length,avl_breadth,dimension[0],dimension[1],row_count,column_count,);
    return column_count+row_count;
}

//Draw the drawDiagram
function drawDiagram(casting_length,casting_breadth,avl_length,avl_breadth,length,breadth,row_count,column_count,cavity)
{
  
  $("#fit_inside .box").remove();
  $("#fit_inside #actual_box").remove();
  $(".actual-box .cavity").remove();
  
  $("#display_diagram #fit_inside").append("<div class='box' data-toggle='tooltip' data-placement='top' title='"+length+"X"+breadth+"' data-original-title='original box' id='original_box'> <div class='actual-box' id='actual_box' data-toggle='tooltip' data-placement='top' title='"+avl_length+" X "+avl_breadth+"' data-original-title='actual box'></div></div>");
  var box=0;
  var temp_cast_width=casting_length,temp_cast_height=casting_breadth;
  var box_width=$("#original_box").css("width");
  var box_height=$("#original_box").css("height");
  
  box_width=box_width.split("px");
   
  box_height=box_height.split("px");
  
  var new_cast_width=((parseInt(box_width[0]))/length);
  var new_cast_height=((parseInt(box_height[0]))/breadth);
  casting_length*=new_cast_width;
  casting_breadth*=new_cast_height;
     
    // }
 
  var margin_width = ((parseInt(box_width[0])-80)/length);
  var margin_height = ((parseInt(box_height[0])-80)/breadth); 
  var margin_left=30*margin_width;
  var margin_top=30*margin_height;
     var left = parseInt($("#actual_box").css("width")) - (casting_length*column_count);
     var right = parseInt($("#actual_box").css("height")) - (casting_breadth*row_count);
     margin_left = left / (column_count +1);
     margin_top  = right / (row_count + 1);
    margin_left=parseInt(margin_left);
    margin_top=parseInt(margin_top);
    for(var i=0;i<row_count;i++)
    {
      for(var j=0;j<column_count;j++)
      {
        if(i === 0 && (j === 0))
        {
          $(".actual-box").append("<div class='cavity' style='margin-left:"+margin_left+"px;margin-top:"+margin_top+"px; border:1px solid black;height:"+parseInt(casting_breadth)+"px;  width:"+parseInt(casting_length)+"px;float:left' data-toggle='tooltip' data-placement='top' title='"+temp_cast_width+"X"+temp_cast_height+"' data-original-title='actual box'></div>");
        } else if(j === column_count-1)
        {
          $(".actual-box").append("<div class='cavity' style='margin-left:"+margin_left+"px;margin-top:"+margin_top+"px; border:1px solid black;height:"+parseInt(casting_breadth)+"px;  width:"+parseInt(casting_length)+"px;float:left' data-toggle='tooltip' data-placement='top' title='"+temp_cast_width+"X"+temp_cast_height+"' data-original-title='actual box'></div>");
         }
         else {
           $(".actual-box").append("<div class='cavity' style='margin-left:"+margin_left+"px;margin-top:"+margin_top+"px; border:1px solid black;height:"+parseInt(casting_breadth)+"px;  width:"+parseInt(casting_length)+"px;float:left' data-toggle='tooltip' data-placement='top' title='"+temp_cast_width+"X"+temp_cast_height+"' data-original-title='actual box'></div>");
         }
       }
     }
     $('[data-toggle="tooltip"]').tooltip();
}
//Calcualte Sand Requirement
function sandRequirement(length,breadth,height,dimension)
{
    var casting = (length * breadth * height *1510)/ Math.pow(10,9);
    var calculate_box_size=0;
    calculate_box_size=(dimension[0] * dimension[1] * (dimension[2] + dimension[3]) * 1510 )/Math.pow(10,9);
    calculate_box_size=parseInt(calculate_box_size);
    box_size_requirement=calculate_box_size;
    casting=parseInt(casting);
    return (calculate_box_size - (casting * cavity));
}

//Calculate the percentage required for newsand,lustron,bentonite
function getPercentage(sand_value,percentage_value)
{
    return sand_value*(percentage_value/100);
}

//print the table
function printRequirementTable(table_name,new_sand,bentonite,lustron,return_sand,icon)
{
    var table_row_start="<tr>";
    var table_data_start="<td>";
    var table_data_end="</td>";
    var table_row_end="</tr>";
    $(table_name).append(table_row_start+table_row_end);
    var table_row=$(table_name+" tr:nth-last-child(1)");
    $(table_row).append(table_data_start+new_sand+table_data_end);
    $(table_row).append(table_data_start+bentonite+table_data_end);
    $(table_row).append(table_data_start+lustron+table_data_end);
    $(table_row).append(table_data_start+return_sand+table_data_end);
    $(table_row).append(table_data_start+icon+table_data_end)
    $(table_row).append(table_row_end);
}
function getInputTable()
{
  var part_no,part_name,type_of_cast,grade,finished_weight,machin_allowance,casting_weight,yeild,core_weight,rejection,casting_dimension;
  var furnace_capacity,sand_mixer_capacity,core_mix,interest,space_cost,box_dimension;
  var type_of_material,purchase_expense,power_state,eb,private_power,level;
  part_no=$("#part_no").val();
  part_name=$("#part_name").val();
  type_of_cast=$('input[name="iron"]:checked').val();
  grade = $("#grade").val().trim();
  
  casting_weight=$("#cast_value").val();
  finished_weight=$("#get_weight").val();
  casting_dimension=$("#casting_length").val()+" X ";
  casting_dimension+=$("#casting_breadth").val()+" X ";
  casting_dimension+=$("#casting_height").val();
  box_dimension=$("#length_size").val()+" X ";
  box_dimension+=$("#breadth_size").val()+" X ";
  box_dimension+=$("#drag_height_size").val()+" X ";
  box_dimension+=$("#cope_height_size").val();
  furnace_capacity=$("#quantity").val();
  yield=$("#yield").val();
  core_mix=$("#core_mix").val();
  core_weight=$("#core_weight").val();
  space_cost=$("#space_cost").val();
  interest=$("#interest").val();
  purchase_expense=findMonthlyCapacity(file_lines,"purchase_expense")
  if($("#sand_mixer").val().toLowerCase()==="others")
  {
    sand_mixer_capacity=$("#new_sand_mixer").val();
  }
  else
  {
    sand_mixer_capacity=$("#sand_mixer").val().replace("kgs","");
  }
  if($("#weight").val().toLowerCase()==="others")
  {
    machin_allowance=$("#new_weight").val();
  }
  else
  {
    machin_allowance=$("#weight").val();
  }
  year=$("#year").val();
  power_state=$("#state").val();
  eb=$("#eb_power").val();
  private_power=$("#private_power").val();
  rejection=$("#rejection").val();
  level = $('input[name="level_0"]:checked').val();
  if($("#crca").prop("checked"))
  {
    type_of_material=$("#crca").val();
  }
  if($("#pig_iron").prop("checked"))
  {
    type_of_material+=","+$("#pig_iron").val(); 
  }
  if($("#foundry").prop("checked"))
  {
    type_of_material+=","+$("#foundry").val();
  }
  $("#display_content #main_table").append("<h3 id='head1' style='text-align:center;'>Casting Details</h3><table class='table table-bordered table-hover well test' id='casting_details' '></table>");
  var table_name="#casting_details";
  printGoodCastingTable(table_name,"Part No",part_no);
  printGoodCastingTable(table_name,"Part Name",part_name);
  printGoodCastingTable(table_name,"Type of cast",type_of_cast);
  printGoodCastingTable(table_name,"Grade",grade);
  printGoodCastingTable(table_name,"Finished Weight (kgs)",finished_weight);
  printGoodCastingTable(table_name,"Machine Allowance",machin_allowance);
  printGoodCastingTable(table_name,"Casting Weight (kgs)",casting_weight);
  printGoodCastingTable(table_name,"Core Weight (kgs)",core_weight);
  printGoodCastingTable(table_name,"Yield (%)",yield);
  printGoodCastingTable(table_name,"Rejection (%)",rejection);
  printGoodCastingTable(table_name,"Casting Dimension(LxBxH) in mm",casting_dimension);

  $("#display_content #main_table").append("<h3 id='head2' style='text-align:center;'>Equipment Details</h3><table class='table table-bordered table-hover well test' id='equipment_details'> </table>");
  var table_name="#equipment_details";
  printGoodCastingTable(table_name,"Furnace Capacity (kgs)",furnace_capacity);
  printGoodCastingTable(table_name,"Sand Mixer Capacity (kgs)",sand_mixer_capacity);
  printGoodCastingTable(table_name,"Core Sand Mixer Capacity (kgs)",core_mix);
  printGoodCastingTable(table_name,"Interest of Raw Material (%)",interest);
  printGoodCastingTable(table_name,"Space Cost (INR per.Sq.m)",space_cost);
  printGoodCastingTable(table_name,"Year ",year);
  printGoodCastingTable(table_name,"Box Dimensions (LxBxCHxDH) in mm",box_dimension);

  $("#display_content #main_table").append("<h3 id='head3' style='text-align:center;'>Material Details</h3><table class='table table-bordered table-hover well test' id='material_details' ></table>");
  var table_name="#material_details";
  printGoodCastingTable(table_name,"Type of Material",type_of_material);
  printGoodCastingTable(table_name,"Purchase Parts Expense",purchase_expense);
  printGoodCastingTable(table_name,"Power State",power_state);
  printGoodCastingTable(table_name,"EB(%)",eb);
  printGoodCastingTable(table_name,"Private(%)",private_power);
  printGoodCastingTable(table_name,"Level",level);


}

function validate()
{
   if($("#part_no").val() === "")
    {
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Part Number is Empty</span></div>")
        return false;
    }
    if($("#part_name").val() === "")
    {
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span>P art Name is Empty</span></div>")
      return false;
    }
   if($("#get_weight").val() === "")
    {
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Weight must be filled</span></div>")
        return false;
    }
    if($("#casting_length").val() === "")
    {
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Casting Length is Empty</span></div>")
      return false;
    }
  if($("#casting_breadth").val() === "")
    {
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Casting Breadth is Empty</span></div>")
      return false;
    }
  if($("#casting_height").val() === "")
    {
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Casting height is Empty</span></div>")
      return false;
    }
  if($("#length_size").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the Box Length</span></div>")
      return false;
  }
  if($("#breadth_size").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the Box Breadth</span></div>")
      return false;
  }
  if($("#drag_height_size").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the Box Drag Height</span></div>")
      return false;
  }
  if($("#cope_height_size").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the Box Cope Height</span></div>")
      return false;
  }
  if($("#cope_height_size").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the Box Cope Height</span></div>")
      return false;
  }
  if($("#quantity").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter the quantity</span></div>")
      return false;
  }
  if($("#yield").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Yield</span></div>")
      return false;
  }
  if($("#core_mix").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Core Mix </span></div>")
      return false;
  }
  if($("#core_weight").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Core Weight</span></div>")
      return false;
  }
  if($("#space_cost").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Space Cost</span></div>")
      return false;
  }
  if($("#interest").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Space Cost</span></div>")
      return false;
  }
  if($("#expenses").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Space Cost</span></div>")
      return false;
  }

  if($("#sand_mixer").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the Sand Mixer</span></div>")
      return false;
  }

  if($("#year").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Choose the year</span></div>")
      return false;
  }

  if($("#state").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Select the state</span></div>")
      return false;
  }
  if($("#eb_power").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Eb power percent</span></div>")
      return false;
  }
  if($("#private_power").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Private power percent</span></div>")
      return false;
  }
  if($("#rejection").val() === null)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Enter Rejection value</span></div>")
      return false;
  }
  if($("#crca").prop("checked")===false)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> CRCA is not selected</span></div>")
      return false;
  }
  if($("#foundry").prop("checked")===false)
  {
    $("#error-message").show();
      $("#error-message").html("<div class='alert alert-dismissable alert-danger'><button class='close' type='button' data-dismiss='alert'>&times;</button><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span> Foundry is not selected</span></div>")
      return false;
  }

    return true;
}
function separatePowerDetails()
{
  
      var table_row_start="<tr>";
      var table_row_end="</tr>";
      var table_data_start="<td>";
      var table_data_end="</td>";
      $("#power_table").append("<tr><th>Sl.No</th><th>State</th><th>EB Rate(INR/Unit)</th><th>Private Rate(INRUnit)</th></tr>");
        $.each(power_file,function(key,value)
        {
          if(value.power_state!="")
          {
            $("#power_table").append(table_row_start+table_data_start+parseInt(key+1)+table_data_end+table_data_start+value.power_state+table_data_end+table_data_start+value.power_eb_unit+table_data_end+table_data_start+value.power_private_tower+table_data_end+table_row_end);
          }        
        });
}
$("#calculate").click(function(){
  var fields = {};
$("#form").find(":input").each(function() {
    // The selector will match buttons; if you want to filter
    // them out, check `this.tagName` and `this.type`; see
    // below
    fields[this.name] = $(this).val();
});
var obj = {fields: fields};
//console.log(obj);

    if(validate())
    {
       // $("#form").fadeOut(); 
        $("#error-message").hide();
        $("#back").show();
        $("#json").show();
         $("#box_table").remove();
        $("#raw_material_cost").remove();
        $("#dis_sand_cost").remove();
        $("#dis_cold_cost").remove();
        $("#raw_material_foundry").remove();
        $("#purchase_goods").remove();
        $("#cost_good_casting").remove();
        $("#dicv_cost_good_casting").remove();
        $("#head_raw_material_cost").remove();
        $("#head_dis_sand_cost").remove();
        $("#head_dis_cold_cost").remove();
        $("#head_dicv").remove();
        $("#head_good_casting").remove();
        $("#head_treat").remove();
        $("#display_equipment_detail").remove();
        $("#equipment_details").remove();
        $("#casting_details").remove();
        $("#material_details").remove();
        $("#table_grade").remove();
        $("#table_sand").remove();
        $("#name_cold").remove();
        $("#display_metallic_detail").remove();
        $("#head_metal").remove();
        $("#treat_disp_detail").remove();
        var length = $("#length_size").val();
        var breadth = $("#breadth_size").val();
        var cope_height = $("#cope_height_size").val();
        var drag_height = $("#drag_height_size").val();
        flush();
        flush_labour();
        getInputTable();
        getBoxSize(length,breadth,cope_height,drag_height);
        getRawMaterialCost();
        getTreatmentCost();
        getSandCost();
        getColdBoxCost();
        inferFile();
        //rgb(0, 3, 255)
        $("#cost_good_casting tr:last td").css("color","teal");
        $("#cost_good_casting tr:last td").css("font-weight","900");
        $("#cost_good_casting tr:last td").css("background","bisque");
        $("#cost_good_casting tr:nth-child(5) td").css("color","teal");
        $("#cost_good_casting tr:nth-child(5) td").css("font-weight","900");
        $("#cost_good_casting tr:nth-child(5) td").css("background","bisque")
        $("#cost_good_casting tr:nth-child(10) td").css("color","teal");
        $("#cost_good_casting tr:nth-child(10) td").css("font-weight","900");
        $("#cost_good_casting tr:nth-child(10) td").css("background","bisque");
        $("#cost_good_casting tr:nth-child(17) td").css("color","teal");
        $("#cost_good_casting tr:nth-child(17) td").css("font-weight","900");
        $("#cost_good_casting tr:nth-child(17) td").css("background","bisque");
        $("#dicv_cost_good_casting tr:last td").css("color","teal");
        $("#dicv_cost_good_casting tr:last td").css("font-weight","900");
       }
    else
    {
      var body = $("html, body");
      body.animate({scrollTop:0}, '3000', 'swing', function() { });
    }
});
$("#new_get_cast").click(function(){
   if(validate())
    {
        $("#error-message").hide();
        $("#back").show();
        $("#json").show();
         $("#box_table").remove();
        $("#raw_material_cost").remove();
        $("#dis_sand_cost").remove();
        $("#dis_cold_cost").remove();
        $("#raw_material_foundry").remove();
        $("#purchase_goods").remove();
        $("#cost_good_casting").remove();
        $("#dicv_cost_good_casting").remove();
        $("#head_raw_material_cost").remove();
        $("#head_dis_sand_cost").remove();
        $("#head_dis_cold_cost").remove();
        $("#head_dicv").remove();
        $("#head_good_casting").remove();
        $("#head_treat").remove();
        $("#display_equipment_detail").remove();
        $("#equipment_details").remove();
        $("#casting_details").remove();
        $("#material_details").remove();
        $("#table_grade").remove();
        $("#table_sand").remove();
        $("#name_cold").remove();
        $("#head1").remove();
        $("#head2").remove();
        $("#head3").remove();
        var length = $("#new_length_size").val();
        var breadth = $("#new_breadth_size").val();
        var cope_height = $("#new_cope_height_size").val();
        var drag_height = $("#new_drag_height_size").val();
        flush();
        flush_labour();
        getInputTable();
        getBoxSize(length,breadth,cope_height,drag_height);
        getRawMaterialCost();
        getTreatmentCost();
        getSandCost();
        getColdBoxCost();
        inferFile();
        $("#cost_good_casting tr:last td").css("color","teal");
        $("#cost_good_casting tr:last td").css("font-weight","900");
        $("#cost_good_casting tr:last td").css("background","bisque");
        $("#cost_good_casting tr:nth-child(5) td").css("color","teal");
        $("#cost_good_casting tr:nth-child(5) td").css("font-weight","900");
        $("#cost_good_casting tr:nth-child(5) td").css("background","bisque")
        $("#cost_good_casting tr:nth-child(10) td").css("color","teal");
        $("#cost_good_casting tr:nth-child(10) td").css("font-weight","900");
        $("#cost_good_casting tr:nth-child(10) td").css("background","bisque");
        $("#dicv_cost_good_casting tr:last td").css("color","teal");
        $("#dicv_cost_good_casting tr:last td").css("font-weight","900");
        $("#dicv_cost_good_casting tr:last td").css("background","bisque");
        var inner_width=window.innerWidth;
    if(parseInt(inner_width)>1000)
    {
      $(".good_cast").css("margin-left","-700px");
      $(".good_cast").css("margin-top","-1200px");
    }
    else
    {
      $(".good_cast").css("margin-left","0px");
      $(".good_cast").css("margin-top","0px");
    }
    var inner_height=window.innerHeight;
    if(parseInt(inner_width)>1000)
    {
      $(".dicv_good_cast").css("margin-left","-695px");
      $(".dicv_good_cast").css("width","500px");
     $(".dicv_good_cast").css("margin-top","800px");
    }
    else
    {
      $(".dicv_good_cast").css("margin-top","800px");
      $(".dicv_good_cast").css("margin-left","0px");
    }
     $(window).resize(function(){
      var inner_width=window.innerWidth;
    if(parseInt(inner_width)>1030)
    {
      $(".good_cast").css("margin-left","-700px");
      $(".good_cast").css("margin-top","-1200px");
    }
    else
    {
      $(".good_cast").css("margin-left","0px");
      $(".good_cast").css("margin-top","0px");
    }
    var inner_height=window.innerHeight;
    if(parseInt(inner_width)>1030)
    {
      $(".dicv_good_cast").css("margin-left","-695px");
      $(".dicv_good_cast").css("width","500px");
      $(".dicv_good_cast").css("margin-top","0px");
    }
    else
    {
     // $(".dicv_good_cast").css("margin-top","800px");
      $(".dicv_good_cast").css("margin-left","0px");
    }
  });
      }
      else
    {
      var body = $("html, body");
      body.animate({scrollTop:0}, '3000', 'swing', function() { });
    }
});
$('[data-toggle="tooltip"]').tooltip();
$("#change_diagram").click(function(){
  var length =$("#new_length_size").val();
  var breadth = $("#new_breadth_size").val();
  var avl_length = $("#new_length_size :selected").data("avl-length");
   var avl_breadth = $("#new_breadth_size :selected").data("avl-breadth");
  var new_cavity = 0,new_row_count=0,new_column_count=0;
  casting_length=$("#casting_length").val();
  casting_breadth=$("#casting_breadth").val();
  length = parseInt(length);
  breadth = parseInt(breadth);
  avl_length = parseInt(avl_length);
  avl_breadth = parseInt(avl_breadth);
  casting_length= parseInt(casting_length);
  casting_breadth= parseInt(casting_breadth); 
  new_cavity = calcualteCavity(parseInt(casting_length),parseInt(casting_breadth),parseInt(avl_length),parseInt(avl_breadth));
  drawDiagram(casting_length,casting_breadth,avl_length,avl_breadth,length,breadth,row_count,column_count,new_cavity);
});
$('#inputFile').on('change', function(){
  
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    var name= $("input:radio[name=level_0]:checked").val();
    $("#upload_label_name").text(name);
    name=name.replace(" ","_");
    if((file.name.trim().indexOf(name)>=0) && file.name.trim().toLowerCase().indexOf("disa"))
    {
      $("#level_error").hide();
      $("#file-error-message").hide();
    //  $("#raw_material_file").prop('disabled', true);
      if($("#level_upload_file").hasClass("has-error"))
      {
        $("#level_upload_file").removeClass("has-error");
      }
      $("#level_upload_file").addClass("has-success");
      $("#level_upload_file").addClass("has-feedback");
      $("#level_success").show();
    reader.onload = function(progressEvent){
      main_file_data = this.result;
      file_lines = $.csv.toObjects(main_file_data);
      createInputFile(file_lines);
      };
    }
    else{
      $("#level_success").hide();
      if($("#level_upload_file").hasClass("has-success"))
      {
        $("#level_upload_file").removeClass("has-success");
      }
      $("#level_upload_file").addClass("has-error");
      $("#level_upload_file").addClass("has-feedback");
      $("#level_error").show();
      $("#file-error-message").show();
      $("#file-error-message").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
  });
  $("#power_file").on('change',function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    if(file.name.trim().indexOf("power")>=0)
    {
      $("#power_error").hide();
      $("#file-error-message").hide();
    //  $("#raw_material_file").prop('disabled', true);
      if($("#power_upload_file").hasClass("has-error"))
      {
        $("#power_upload_file").removeClass("has-error");
      }
      $("#power_upload_file").addClass("has-success");
      $("#power_upload_file").addClass("has-feedback");
      $("#power_success").show();
    reader.onload = function(progressEvent){
      main_file_data = this.result;
      power_file = $.csv.toObjects(main_file_data);
      separatePowerDetails();
      //calculatePowerCost();
      createPowerFile(power_file);
    }
  }
  else{
      $("#power_success").hide();
      if($("#power_upload_file").hasClass("has-success"))
      {
        $("#power_upload_file").removeClass("has-success");
      }
      $("#power_upload_file").addClass("has-error");
      $("#power_upload_file").addClass("has-feedback");
      $("#power_error").show();
      $("#file-error-message").show();
      $("#file-error-message").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
    
  });
  $("#spec_file").on('change',function(){
     
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    if(file.name.trim().toLowerCase().indexOf("disa")>=0)
    {
      $("#disa_error").hide();
      $("#file-error-message").hide();
    //  $("#raw_material_file").prop('disabled', true);
      if($("#disa_upload_file").hasClass("has-error"))
      {
        $("#disa_upload_file").removeClass("has-error");
      }
      $("#disa_upload_file").addClass("has-success");
      $("#disa_upload_file").addClass("has-feedback");
      $("#disa_success").show();
    reader.onload = function(){
      main_file_data = this.result;
      spec_file = $.csv.toObjects(main_file_data);
      //calculateSpec();
      createSpecFile(spec_file);
    } 
  }
  else{
      $("#disa_success").hide();
      if($("#disa_upload_file").hasClass("has-success"))
      {
        $("#disa_upload_file").removeClass("has-success");
      }
      $("#disa_upload_file").addClass("has-error");
      $("#disa_upload_file").addClass("has-feedback");
      $("#disa_error").show();
      $("#file-error-message").show();
      $("#file-error-message").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
  });
  $("#level_0").click(function(){
    $("#upload_label_name").text("Level 0");
  });
  $("#level_1").click(function(){
    $("#upload_label_name").text("Level 1");
  });
  $("#level_2").click(function(){
    $("#upload_label_name").text("Level 2");
  });
  $("#level_3").click(function(){
    $("#upload_label_name").text("Level 3");
  });
  $("#level_4").click(function(){
    $("#upload_label_name").text("Level 4");
  });
  $("#eb_power").keyup(function(){
    var eb=$("#eb_power").val();
    if(eb<=100)
    {
    if(eb!='')
    {
      $("#private_power").val(100-parseInt(eb));
    }
  }
  else
  {
    $("#eb_power").val(100);
    $("#private_power").val(0);
    alert("Percentage can't exceed 100...")
  }
  });
  $("#private_power").keyup(function(){
    var private_pow=$("#private_power").val();
    if(private_pow <= 100)
    {
    if( private_pow!='')
    {
      $("#eb_power").val(100-parseInt(private_pow));
    }
  }
  else
  {
   $("#eb_power").val(0);
    $("#private_power").val(100);
    alert("Percentage can't exceed 100...") 
  }
  });
  $("#click").click(function(){
    var table_row = $("#raw_material_cost").find('tr').size();
    var table_length = $("#raw_material_cost").find('tr')[1].cells.length;
    var i=0,j=0,keys=[],obj,ret=[];
    for(i=0;i<table_row;i++)
    {
        if(i==0)
        {
          for(;j<table_length;j++)
          {
          keys.push($("#raw_material_cost").find('tr')[i].cells[j].innerHTML);
        }
        }
        else
        {
          obj = {};
          for(j=0;j<table_length;j++)
          {
          obj[keys[j]] = $("#raw_material_cost").find('tr')[i].cells[j].innerHTML;
         
        }
        ret.push(obj);
      }
      //keys.push(obj);
    }
    //ret.push(keys);
    //return ret;

  });
  });