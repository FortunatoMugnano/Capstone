import React, { Component } from 'react'
import CompanyCard from './CompanyCard'
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';



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
             <section className="section-content">           
             <Link to={'/companies/new'}><button>Add a Company</button></Link>       
             </section>
                <div className="container-cards">
                    {this.state.companies.map(company =>
                        <CompanyCard key={company.id} Id={company.id} company={company}  {...this.props} />
                    )}
                </div>
            </>
        )
    }
}
export default CompanyList