function printRawMaterialTable(table_name,material_name,qty,rate,cost)
{
  var table_data_start="<td>";
  var table_data_end="</td>";
  $(table_name).append("<tr></tr>");
  
  var table_last_row = table_name+" tr:nth-last-child(1)";
  $(table_last_row).append(table_data_start+material_name+table_data_end);
  $(table_last_row).append(table_data_start+qty+table_data_end);
  $(table_last_row).append(table_data_start+rate+table_data_end);
  $(table_last_row).append(table_data_start+(cost)+table_data_end);
}
function printGoodCastingTable(table_name,name,value)
{
var table_data_start="<td>";
var table_data_end="</td>";
$(table_name).append("<tr></tr>");
var table_last_row = table_name+" tr:nth-last-child(1)";
$(table_last_row).append(table_data_start+name+table_data_end);
$(table_last_row).append(table_data_start+value+table_data_end);
}