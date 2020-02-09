import React, { Component } from 'react'
import CompanyCard from './CompanyCard'
import CompanyManager from '../../API/CompanyManager';
import { createAuthHeaders } from '../../API/userManager';
import { Link } from 'react-router-dom';
import { Button, Input} from 'reactstrap';



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
            <Link to={'/companies/new'} style={{alignSelf: 'flex-end'}}><Button color="danger" >Add a Company</Button></Link>
            <h5 style={{marginTop: '8px'}}>Find a Company by Name or Industry:</h5> 
            {this.state.searchQuery ? (
                <>
                <section className='companySearch' style={{display: 'flex', flexDirection: 'column'}}>
				<Input type="search" style={{ width: '50%', alignSelf: 'center'}} id='searchQuery'	onChange={this.handleFieldChange} placeholder='Search by Name or Industry'></Input>
				{this.state.searchResults.map(company => (
					<CompanyCard
                    key={company.id} Id={company.id} company={company}  {...this.props} username={this.props.user.username}
					/>
				))}
			    </section>
            </>
            ) : (
                <>
             <section className="section-content" style={{display: 'flex', flexDirection: 'column'}}>   
             <Input
                    style={{ width: '50%', alignSelf: 'center'}}
                    type="search"
					id='searchQuery'
					onChange={this.handleFieldChange}
					placeholder='Search by Name or Industry'
				></Input>              
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