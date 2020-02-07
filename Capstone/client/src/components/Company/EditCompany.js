import React, { Component } from "react"
import CompanyManager from '../../API/CompanyManager'
import IndustryTypeManager from '../../API/IndustryTypeManager';
import { createAuthHeaders } from '../../API/userManager';
import Select from 'react-select'


class EditCompany extends Component {
    state = {
        id: "",
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
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleNumberFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = +evt.target.value;
        this.setState(stateToChange);
    };

    handleCompanyIdsFieldChange = evt => {
       
        this.setState({industryTypeIds: evt}) 
    }

    updateExistingCompany = evt => {
        evt.preventDefault()
        const authHeader = createAuthHeaders();
        this.setState({ loadingStatus: true });
        const editedCompany = {
            id: +this.props.match.params.companyId,
            name: this.state.name,
            website: this.state.website,
            country: this.state.country,
            city: this.state.city,
            industryTypeIds: this.state.industryTypeIds.map(e => e.value),
            zipCode: this.state.zipCode,
            address: this.state.address,
            founded: this.state.founded
        };

        CompanyManager.update(editedCompany, authHeader)
            .then(() => this.props.history.push("/companies"))
    }

    

    componentDidMount() {
        const authHeader = createAuthHeaders();
            IndustryTypeManager.getIndustryTypes(authHeader)
            .then(allIndustries => {
                CompanyManager.getSingleCompany(this.props.match.params.companyId, authHeader)
                    .then(company => {
                        this.setState({
                            id: company.id,
                            name: company.name,
                            website: company.website,
                            country: company.country,
                            city: company.city,
                            industryTypeIds: company.industryTypeIds,
                            zipCode: company.zipCode,
                            loadingStatus: false,
                            address: company.address,
                            companyTypes: allIndustries,
                            founded: company.founded
                        })
                    })
            })
        
        
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                        <label htmlFor="title">Name</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name}
                            />
                            
                            <label htmlFor="website">WebSite</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="website"
                                value={this.state.website}
                            />
                           <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="country"
                                value={this.state.country}
                            />
                           <label htmlFor="city">City</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="city"
                                value={this.state.city}
                            />
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="address"
                                value={this.state.address}
                            />
                            <label htmlFor="zipCode">ZipCode</label>
                            <input
                                type="number"
                                required
                                className="form-control"
                                onChange={this.handleNumberFieldChange}
                                id="zipCode"
                                value={this.state.zipCode}
                            />
                            <label htmlFor="city">Founded</label>
                            <input
                                type="datetime-local"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="founded"
                                value={this.state.founded}
                            />
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
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingCompany}
                                className="btn btn-primary"
                            >Update</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditCompany