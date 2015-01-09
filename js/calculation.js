$(function () {
var casting_breadth,casting_length,casting_height,cavity,box_dimension,bentonite,new_sand,lustron,return_sand,type;

//Get the Box Size
function getBoxSize()
{
  var div_box_dimension_start="<div";
  var div_box_dimension_end="</div>";
  casting_length=$("#casting_length").val();
  casting_breadth=$("#casting_breadth").val();
  casting_height=$("#casting_height").val();
  box_dimension=$("#box_size").val();
  var dimension=box_dimension.split('X').map(Number);
  var avl_length=$("#box_size").find(':selected').attr("data-avl-length").trim();
  var avl_breadth=$("#box_size").find(':selected').attr("data-avl-breadth").trim();
  casting_length=parseInt(casting_length);
  casting_breadth=parseInt(casting_breadth);
  avl_length=parseInt(avl_length);
  avl_breadth=parseInt(avl_breadth);


  cavity = calcualteCavity(parseInt(casting_length),parseInt(casting_breadth),parseInt(avl_length),parseInt(avl_breadth));

  var sand_requirement=sandRequirement(casting_length,casting_breadth,casting_height,dimension);
  sand_requirement=parseInt(sand_requirement);
  new_sand = getPercentage(sand_requirement,2);
  bentonite = getPercentage(sand_requirement,0.8);
  lustron = getPercentage(sand_requirement,0.4);
  
  return_sand = (sand_requirement -(new_sand+bentonite+lustron));
  var table_start="<table id='box_table' class='table table-bordered table-hover'>";
  var table_heading="<tr><th>Length</th><th>Breadth</th><th>Cope Height</th><th>Drag Height</th><th>Sand  Requirement</th><th>New Sand</th><th>Bentonite</th><th>Lustron</th><th>Return Sand</th></tr>"
  var table_end="</table>";
  $("#display_content").append(table_start+table_heading);
  printRequirementTable("#box_table",dimension,sand_requirement,new_sand,bentonite,lustron,return_sand);
  $("#box_table").append(table_end);
  $("#get_box_dimension").append(div_box_dimension_start+" data-casting-length='"+casting_length+"'"+"data-casting-breadth='"+casting_breadth+"'"+"data-casting-height='"+casting_height+"'"+"data-box-length='"+dimension[0]+"'"+"data-box-breadth='"+dimension[1]+"'"+"data-cope-height='"+dimension[2]+"'"+"data-drag-height='"+dimension[3]+"'"+"data-cavity='"+cavity+"'"+"data-sand-requirement='"+sand_requirement+"'"+"data-new-sand='"+new_sand+"'"+"data-bentonite='"+bentonite+"'"+"data-lustron='"+lustron+"'"+"data-return-sand='"+return_sand+"' >"+div_box_dimension_end);
}

//Calcualte the Number of Cavity
function calcualteCavity(casting_length,casting_breadth,length,breadth)
{
    var temp_casting_length=casting_length+30;
    var temp_casting_breadth=casting_breadth+30;
    var row_count=0,column_count=0;
    temp_casting_length=parseInt(temp_casting_length);
    temp_casting_breadth=parseInt(temp_casting_breadth);
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
    return column_count+row_count;
}

//Calcualte Sand Requirement
function sandRequirement(length,breadth,height,dimension)
{
    var casting = (length * breadth * height *1510)/ Math.pow(10,9);
    var calculate_box_size=0;
    calculate_box_size=(dimension[0] * dimension[1] * (dimension[2] + dimension[3]) * 1510 )/Math.pow(10,9);
    calculate_box_size=parseInt(calculate_box_size);
    casting=parseInt(casting);
    return (calculate_box_size - (casting * cavity));
}

//Calculate the percentage required for newsand,lustron,bentonite
function getPercentage(sand_value,percentage_value)
{
    return sand_value*(percentage_value/100);
}

//print the table
function printRequirementTable(table_name,dimension,sand_requirement,new_sand,bentonite,lustron,return_sand)
{
    var table_row_start="<tr>";
    var table_data_start="<td>";
    var table_data_end="</td>";
    var table_row_end="</tr>";
    $(table_name).append(table_row_start+table_row_end);
    var table_row=$(table_name+" tr:nth-last-child(1)");
    for(var i=0;i<dimension.length;i++)
    {
        $(table_row).append(table_data_start+dimension[i]+table_data_end);
    }
    $(table_row).append(table_data_start+sand_requirement+table_data_end);
    $(table_row).append(table_data_start+new_sand+table_data_end);
    $(table_row).append(table_data_start+bentonite+table_data_end);
    $(table_row).append(table_data_start+lustron+table_data_end);
    $(table_row).append(table_data_start+return_sand+table_data_end);
    $(table_row).append(table_row_end);
}

function validate()
{
    if($("#get_weight").val() > 0)
    {
        return true;
    }
    return false;
}

$("#calculate").click(function(){
    if(validate())
    {
        $("#form").fadeOut(); 
        console.log("name"+name);
        getBoxSize();
        getRawMaterialCost();
        getSandCost();
        getColdBoxCost();
    }
});    
});