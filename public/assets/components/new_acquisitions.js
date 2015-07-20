var SelectorOption=React.createClass({displayName:"SelectorOption",render:function(){return React.createElement("option",{value:this.props.optionValue},this.props.optionValue)}}),YearSelector=React.createClass({displayName:"YearSelector",render:function(){var e=this.props.yearOptions.map(function(e,t){return React.createElement(SelectorOption,{key:t,optionValue:e})});return React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:"year"},"Year"),React.createElement("select",{name:"year",type:"select",className:"form-control",onChange:this.props.changeHandler,value:this.props.defaultYear},e))}}),NewAcquisitionForm=React.createClass({displayName:"NewAcquisitionForm",handleSubmit:function(e){e.preventDefault();var t={year:this.props.year,company:React.findDOMNode(this.refs.company).value.trim(),initial_price:React.findDOMNode(this.refs.initial_price).value.trim(),acquisition_price:React.findDOMNode(this.refs.acquisition_price).value.trim()};$.ajax({url:"/api/admin/acquisitions",type:"POST",data:{acquisition:t},success:function(){window.location.href="/admin/acquisitions"},error:function(e,t,a){console.error(t,a.toString())}})},render:function(){var e=[{label:"Company",inputValue:"company"},{label:"Price at Beginning of Year",inputValue:"initial_price"},{label:"Buy Out Price",inputValue:"acquisition_price"}].map(function(e,t){return React.createElement("div",{key:t,className:"form-group"},React.createElement("label",{htmlFor:e.inputValue},e.label),React.createElement("input",{name:e.inputValue,type:"text",className:"form-control",ref:e.inputValue,required:"true"}))});return React.createElement("form",{onSubmit:this.handleSubmit},React.createElement(YearSelector,{defaultYear:this.props.year,changeHandler:this.props.yearSelection,yearOptions:this.props.yearOptions}),e,React.createElement("input",{type:"submit",className:"btn btn-success",value:"Add New Acquisition"}))}}),NewAcquisition=React.createClass({displayName:"NewAcquisition",getInitialState:function(){return{yearOptions:[],year:""}},yearSelection:function(e){this.setState({year:e.target.value})},componentDidMount:function(){this.getAcquisitionData()},getAcquisitionData:function(){$.ajax({url:"/api/admin/acquisitions/new",dataType:"json",type:"GET",success:function(e){this.setState({yearOptions:e.year_options,year:e.current_year})}.bind(this),error:function(e,t,a){console.error(t,a.toString())}})},render:function(){return React.createElement("div",null,React.createElement("h1",null,"Create New Acquisition"),React.createElement(NewAcquisitionForm,{yearOptions:this.state.yearOptions,yearSelection:this.yearSelection,year:this.state.year}))}});React.render(React.createElement(NewAcquisition,null),document.getElementById("admin-acquisitions-new-container"));