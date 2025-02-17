export function htmlforlastpayment() {
   const html = `<html>
    <head>
    <!--    <link rel="stylesheet" type="text/css" href="style.css">-->
    </head>
    <body>
    <style>
        body{
      
            /*letter-spacing: 0.0mm !important;*/
            /*text-align: justify;*/
            /*font-kerning: auto;*/
            /*line-height: 80%;*/
        }
    
        table{
            width: 100%;
        }
    
        tr{
            line-height: 70%;
        }
    
        td{
            /*border: 1px black solid;*/
            font-size: x-small;
        }
    
        #header-col-1{
            width: 39%;
        }
    
        #header-col-2 {
            width: 61%;
        }
    
        /*#header-col-3 {*/
        /*    width: 44%;*/
        /*}*/
    
        #logo-wrapper{
            vertical-align: top;
            text-align: left;
        }
    
        #logo{
            max-width: 86px;
            max-height: 40px;
            margin-top:-2px;
  
        }
    
        #document-type-wrapper{
            text-align: right;
            line-height: 1.2;
            vertical-align: top;
        }
    
        #document-type{
            font-size: 20px;
        }
    
        #receiver-details-wrapper td{
            vertical-align: top;
        }
    
        #receiver-details-wrapper td:nth-child(2) {
            text-align: right;
        }
    
        #receiver-details-wrapper-col-1{
            width: 50%;
        }
    
        #receiver-details-wrapper-col-2{
            width: 35%;
        }
    
        #receiver-details-wrapper-col-3{
            width: 15%;
        }
    
        #products-table-col-1{
            width: 52%;
        }
    
        #products-table-col-2{
            width: 16%;
        }
    
        #products-table-col-3{
            width: 16%;
        }
    
        #products-table-col-4{
            width: 16%;
        }
    
        #products-table thead tr td:nth-child(2) {
            text-align: center;
        }
    
        #products-table thead tr td:nth-child(3), #products-table thead tr td:nth-child(4) {
            text-align: right;
        }
    
        #products-table tbody tr td:nth-child(3), #products-table tbody tr td:nth-child(4) {
            text-align: right;
        }
    
        #total-wrapper-col-1{
            width: 60%;
        }
    
        #total-wrapper-col-2{
            width: 24%;
        }
    
        #total-wrapper-col-3{
            width: 16%;
        }
    
        #total-wrapper td{
            text-align: right;
        }
    
        #bottom-notice-wrapper-col-1{
            width: 100%;
        }
    
        #bottom-notice-wrapper tbody tr td{
            text-align: center;
        }
    </style>
    <table id="header">
        <tr>
            <th id="header-col-1"></th>
            <th id="header-col-2"></th>
        </tr>
        <tr>
            <td id="logo-wrapper">
                %logo%
            </td>
            <td id="document-type-wrapper">
                <p id="document-type">%document-title%</p><br/>
                <b>%company-from%</b><br/>
                %address-from%<br/>
                %zip-from%, %city-from%<br/>
                %country-from%<br/>
                %sender-custom-1%<br/>
                %sender-custom-2%<br/>
                %sender-custom-3%
            </td>
        </tr>
    </table>
    <br/>
    <hr/>
    <table id="receiver-details-wrapper">
        <tr>
            <th id="receiver-details-wrapper-col-1"></th>
            <th id="receiver-details-wrapper-col-2"></th>
            <th id="receiver-details-wrapper-col-3"></th>
        </tr>
        <tr>
            <td>
                <b>%company-to%</b>
                <br/>
                %address-to%<br/>
                %zip-to%, %city-to%<br/>
                %country-to%<br/>
                %client-custom-1%<br/>
                %client-custom-2%<br/>
                %client-custom-3%
            </td>
            <td id="details-label-wrappe">
                <b>Invoice Nr. :</b><br/>
                <b>%date-title%:</b><br/>
            </td>
            <td>
                %number%<br/>
                %date%<br/>
              
            </td>
        </tr>
    </table>
    <br/>
    <br/>
    <table id="products-table">
        <thead>
        <tr>
            <th id="products-table-col-1"></th>
            <th id="products-table-col-2"></th>
            <th id="products-table-col-3"></th>
            <th id="products-table-col-4"></th>
        </tr>
        <tr>
            <td><b>%products-header-products%</b></td>
            <td><b>%products-header-quantity%</b></td>
            <td><b>%products-header-price%</b></td>
            <td><b>%products-header-total%</b></td>
        </tr>
        <tr>
            <td colspan="4">
                <hr/>
            </td>
        </tr>
        </thead>
        <tbody>
        <products>
            <tr>
                <td>%description%</td>
                <td align="center">%quantity%</td>
                <td>%price%</td>
                <td>%row-total%</td>
            </tr>
        </products>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="4">
                <hr/>
            </td>
        </tr>
        </tfoot>
    </table>
    <br/>
    <table id="total-wrapper">
        <thead>
        <tr>
            <th id="total-wrapper-col-1"></th>
            <th id="total-wrapper-col-2"></th>
            <th id="total-wrapper-col-3"></th>
        </tr>
 
        </thead>
        <tbody>
 
        </tbody>
        <tfoot>
        <tr>
            <td></td>
            <td colspan="2">
                <hr/>
            </td>
        </tr>
        <tr>
            <td></td>
            <td><b>%total-title%:</b></td>
            <td> &#163;%total%</td>
        </tr>
        </tfoot>
    </table>
    <br/>
    <br/>
    <table id="bottom-notice-wrapper">
        <thead>
        <tr>
            <th id="bottom-notice-wrapper-col-1"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>%bottom-notice%</td>
        </tr>
        </tbody>
    </table>
    </body>
    </html>`;
   return html;
}
