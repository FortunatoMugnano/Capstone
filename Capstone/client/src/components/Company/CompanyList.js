import React, { Component } from 'react'
import CompanyCard from './CompanyCard'
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';




class CompanyList extends Component {
    state = {
        companies: [],
        searchQuery: '',
		searchResults: []
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

    handleSearch(searchString) {
        const authHeader = createAuthHeaders();
		if (searchString.length > 1) {
			CompanyManager.findCompany(searchString, authHeader).then(response => {
				this.setState({ searchResults: response });
			});
		} else {
			this.setState({ searchResults: [] });
		}
	}
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange, () =>
			this.handleSearch(this.state.searchQuery)
		);
	};

    render() {
         return ( 
            <>
            <h5>Find a Company by Name or Industry:</h5>
            <Link to={'/companies/new'}><button>Add a Company</button></Link> 
            {this.state.searchQuery ? (
                <>
                <section className='companySearch'>
				<input id='searchQuery'	onChange={this.handleFieldChange} placeholder='Search by Name or Industry'></input>
				{this.state.searchResults.map(company => (
					<CompanyCard
                    key={company.id} Id={company.id} company={company}  {...this.props} username={this.props.user.username}
					/>
				))}
			    </section>
            </>
            ) : (
                <>
             <section className="section-content">   
             <input
					id='searchQuery'
					onChange={this.handleFieldChange}
					placeholder='Search by Name or Industry'
				></input>              
             </section>
                <div className="container-cards">
                    {this.state.companies.map(company =>
                    <CompanyCard key={company.id} Id={company.id} company={company}  {...this.props} />
                    )}
                </div>
               </>
            )}
             </>
        )
    }
}
export default CompanyList