import React, { Component } from 'react';
import CompanyManager from '../../API/CompanyManager';
import IndustryTypeManager from '../../API/IndustryTypeManager';
import { createAuthHeaders } from '../../API/userManager';
import Select from 'react-select'




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

    render() {


        return (
            <>
                
                    
                        
                        <label htmlFor="name">Name </label>
                            <input type="text" required onChange={this.handleFieldChange} id="name" placeholder="Name" />
                            <label htmlFor="website">Web Site </label>
                            <input type="text" required onChange={this.handleFieldChange} id="website" placeholder="WebSite" />
                            <label htmlFor="country">Country </label>
                            <input type="text" required onChange={this.handleFieldChange}  id="country" placeholder="Country" />
                            <label htmlFor="city">City </label>
                            <input type="text" required onChange={this.handleFieldChange} id="city" placeholder="City" />
                            <label htmlFor="address">Address </label>
                            <input type="text" required onChange={this.handleFieldChange} id="address" placeholder="Address" />
                            <label htmlFor="city">Zip Code </label>
                            <input type="number" required onChange={this.handleNumberFieldChange} id="zipCode" placeholder="ZipCode" />
                            <label htmlFor="founded">Founded </label>
                            <input type="date" required onChange={this.handleFieldChange} id="founded" placeholder="Founded" />
                            <label htmlFor="companyTypes">Company Types </label>
                            <Select isMulti isSearchable
                                id="companyTypeId"
                                value={this.state.industryTypeIds}

                                onChange={this.handleCompanyIdsFieldChange}
                                options={this.state.companyTypes.map(type => {
                                    return{value: type.id, label: type.industry}
                                })}
                            >
                               
                                
                            </Select>
                        
                        <div className="alignRight">
                            <button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewCompany}>Add a Company
                            </button>
                        </div>
                    
                
            </>
        )
    }
}

export default AddCompanyForm;