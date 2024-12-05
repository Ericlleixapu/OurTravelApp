import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destination } from '../models/destination.model';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private baseUrl = 'http://localhost:3000/api/destination';
  private countryList: string[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private notification: NotificationService) {
    this.getCountryList();
  }

  async getDestinationsByTravel(travelId: string): Promise<Destination[]> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.get<Destination[]>(this.baseUrl + '/travel/' + travelId, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar els destins');
      return [];
    }
  }

  async addDestination(destination: Destination): Promise<Destination> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.post<Destination>(this.baseUrl, destination, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al crear el desti');
      return {} as Destination;
    }
  }
  async updateDestination(destination: Destination): Promise<Destination> {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.put<Destination>(this.baseUrl + '/' + destination._id, destination, { headers }));
      return res;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar el desti');
      return {} as Destination;
    }
  }

  async deleteDestination(destination: Destination) {
    const headers = this.getAuthHeaders();
    try {
      let res = await lastValueFrom(this.http.delete<Destination>(this.baseUrl + '/' + destination._id, { headers }));
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al modificar el desti');
    }
  }

  public async getCountryList():Promise<string[]>  {
    const headers = this.getAuthHeaders();
    try {
      const countryList = await lastValueFrom(this.http.get<string[]>(this.baseUrl + '/countries', { headers }));
      return countryList;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar els destins');
      return [];
    }
  }

  public async getCityList(country: string):Promise<string[]> {
    const headers = this.getAuthHeaders();
    try {
      const cityList = await lastValueFrom(this.http.get<string[]>(this.baseUrl + '/cities/' + country, { headers }));
      return cityList;
    } catch (error: unknown) {
      this.notification.handleError(error, 'Error al carregar els destins');
      return [];
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }
}



/*const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo (Democratic Republic)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]*/
