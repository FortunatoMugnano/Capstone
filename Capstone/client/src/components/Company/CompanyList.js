import React, { Component } from 'react'
import CompanyCard from './CompanyCard'
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';


class CompanyList extends Component {
    state = {
        companies: [],
    }

    

    componentDidMount() {
        const authHeader = createAuthHeaders();
        CompanyManager.getCompanies(authHeader)
            .then((companies) => {
                this.setState({
                    companies: companies
                })
            })
    }

    render() {
       

        return ( 
            <>
             
                <div className="container-cards">
                    {this.state.companies.map(company =>
                        <CompanyCard key={company.id} Id={company.Id} company={company}  {...this.props} />
                    )}
                </div>
            </>
        )
    }
}
export default CompanyList