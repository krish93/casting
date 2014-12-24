function printRawMaterialTable(table_name,material_name,qty,rate)
{
    var table_data_start="<td>";
    var table_data_end="</td>";
    $(table_name).append("<tr></tr>");
    var table_last_row = table_name+" tr:nth-last-child(1)";
    $(table_last_row).append(table_data_start+material_name+table_data_end);
    $(table_last_row).append(table_data_start+qty.toFixed(2)+table_data_end);
    $(table_last_row).append(table_data_start+parseFloat(rate)+table_data_end);
    $(table_last_row).append(table_data_start+(parseFloat(rate)*parseFloat(qty)).toFixed(2)+table_data_end);
}