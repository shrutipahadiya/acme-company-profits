const { Component } = React
const { render } = ReactDOM
const { Switch, Link, Route, HashRouter, Redirect } = ReactRouterDOM

class App extends Component {
	state={
		companies : [],
		profits : []
	}


	componentDidMount(){
		console.log("componentDidMount");
		axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')
			.then(response => 
			{
			console.log(response);	
			return response.data;
			})
		.then((companies)=> {
			console.log(companies);
			this.setState({companies}) 
			console.log(this.state)
			
		});
		
	
}
	


	render() {
		const {companies} = this.state;
		console.log( companies);
		return (
			<HashRouter>
				<Route render={ ({ location })=> <Nav path={ location.pathname } companies={ companies } /> } />
              <Switch>
                <Route path='/companies' render={()=> <CompaniesList  companies= { companies }/>} />
                <Redirect to='/companies' />
			   </Switch>
			  </HashRouter>


		);

		//return "Your app here"
	}
}

const Nav = ({ companies, path })=> {
	const links = [
	  { to: 'companies', text: `Companies`},
	  { to: 'profits', text: `Profits`}
	];
	return (
	  <nav>
		<h1 id='title'>ACME Profits </h1>
		<div>
		{
		  links.map( (link, idx) => <Link className={ path.slice(1) === link.to ? 'selected': ''} key={ idx } to={ link.to }>{ link.text }</Link>)
		}
		</div>
	  </nav>
	);
  }




const CompaniesList = ({companies}) =>{
	console.log("company list=");
	return (
		<div>
		<ul>{
		companies.map(
		company => {
		//console.log(company);
		return <li key={company.id}>{company.name}</li>
		})
		}
		</ul>
	</div>
	);
};


	


const root = document.querySelector("#root")
render(<App />, root)
