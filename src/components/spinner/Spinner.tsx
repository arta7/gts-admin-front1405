import './spinner.css';
export default function Spinner() {
	return <div className='spinnerContainer'>
		<div className={"spinner"}>
			<br /><br /><br />
			<div className="loader-spinner" id="loader-spinner"></div>
			<div className="loader-spinner" id="loader2"></div>
			<div className="loader-spinner" id="loader3"></div>
			<div className="loader-spinner" id="loader4"></div>
			<span id="spinnerText">در حال بارگذاری...</span><br />
		</div>
	</div>
}