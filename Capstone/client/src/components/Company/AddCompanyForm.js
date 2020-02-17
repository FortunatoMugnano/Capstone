import React, { Component } from 'react';
import CompanyManager from '../../API/CompanyManager';
import IndustryTypeManager from '../../API/IndustryTypeManager';
import { createAuthHeaders } from '../../API/userManager';
import Select from 'react-select'
import { Button, Label, Input } from 'reactstrap';
import { Link} from 'react-router-dom';




class AddCompanyForm extends Component {
    state = {
        name: "",
        website: "",
        country: "",
        loadingStatus: false,
        city: "",
        companyTypes: [],
        industryTypeIds: [],
        zipCode: "",
        address: "",
        founded: ""

    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleNumberFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = +evt.target.value;
        this.setState(stateToChange);
    };
    handleCompanyIdsFieldChange = evt => {
       
        this.setState({industryTypeIds: evt}) 
    }
 

    componentDidMount() {
        const authHeader = createAuthHeaders();
        IndustryTypeManager.getIndustryTypes(authHeader)
            .then((allIndustries) => {
                this.setState({
                    companyTypes: allIndustries
                }
                )
            })
    };

    
    constructNewCompany = evt => {
        evt.preventDefault();
        const authHeader = createAuthHeaders();
        const company = {
            name: this.state.name,
            website: this.state.website,
            country: this.state.country,
            city: this.state.city,
            industryTypeIds: this.state.industryTypeIds.map(e => e.value),
            zipCode: this.state.zipCode,
            address: this.state.address,
            founded: this.state.founded
        };
        CompanyManager.post(company, authHeader)
            .then(() => this.props.history.push("/companies"))        
    };


     customStyles = {
        option: (provided, state) => ({
          ...provided,
           width: '100%',
           alignSelf: "center"
        }),
    }

    render() {


        return (
            <>
                
                    
                        <h3>Add a new Company</h3>
                        <Label htmlFor="name">Name </Label>
                            <Input style={{width: '50%', alignSelf: "center"}} type="text" required onChange={this.handleFieldChange} id="name" placeholder="Name" />
                            <Label htmlFor="website">Web Site </Label>
                            <Input style={{width: '50%', alignSelf: "center"}} type="text" required onChange={this.handleFieldChange} id="website" placeholder="WebSite" />
                            <Label htmlFor="country">Country </Label>
                            <Input  style={{width: '50%', alignSelf: "center"}} type="text" required onChange={this.handleFieldChange}  id="country" placeholder="Country" />
                            <Label htmlFor="city">City </Label>
                            <Input style={{width: '50%', alignSelf: "center"}} type="text" required onChange={this.handleFieldChange} id="city" placeholder="City" />
                            <Label htmlFor="address">Address </Label>
                            <Input style={{width: '50%', alignSelf: "center"}} type="text" required onChange={this.handleFieldChange} id="address" placeholder="Address" />
                            <Label htmlFor="city">Zip Code </Label>
                            <Input style={{width: '50%', alignSelf: "center"}} type="number" required onChange={this.handleNumberFieldChange} id="zipCode" placeholder="ZipCode" />
                            <Label htmlFor="founded">Founded </Label>
                            <Input style={{width: '50%', alignSelf: "center"}} type="date" required onChange={this.handleFieldChange} id="founded" placeholder="Founded" />
                            <Label htmlFor="companyTypes">Company Types </Label>
                            <Select isMulti isSearchable
                             styles={this.customStyles}
                                id="companyTypeId"
                                value={this.state.industryTypeIds}

                                onChange={this.handleCompanyIdsFieldChange}
                                options={this.state.companyTypes.map(type => {
                                    return{value: type.id, label: type.industry}
                                })}
                            >
                               
                                
                            </Select>
                        
                        <div className="alignRight" style={{marginTop: '5px'}}>
                           <Link><Button color="primary" disabled={this.state.loadingStatus} onClick={this.constructNewCompany}>Add a Company
                            </Button></Link>
                        </div>
                    
                
            </>
        )
    }
}

export default AddCompanyForm;