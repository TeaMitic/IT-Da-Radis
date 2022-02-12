<template >
	<div class="container-fluid mainDiv">
		<!-- header with navbar -->
		<div v-if="userType == 'C'">
			<CompanyHeader />
		</div>
		<div v-else>
			<Header />
		</div>
		<div class="container-xxl px-0">
			<div v-if="isDataLoaded">			
					
					<div v-if="!editable" class="px-5">
					<hr />
					<h4 class="text-muted">Job infromations</h4>
						<div class="card rounded jobAd my-3 mx-5 p-5">
						<div class="d-flex flex-column jobAd-info">
						<div class="d-flex flex-row jobAd-info-basic">
							<div v-if="user.image" class="imageDiv d-flex justify-content-center">
								<img class="logo p-2" v-bind:src= imageUrl alt="Logo firme"/>
							</div>
							<div v-else class="imageDiv d-flex justify-content-center">
								<img class="logo p-2" src= "../assets/img/company-card-bg.jpg" alt="Logo firme"/>
							</div>
							<div class=" mx-3 d-flex flex-column align-items-start mt-3 text-start" > 
								<h4 class="mb-3">
									{{ jobAd.name }}
								</h4>
								<div class="d-flex flex-column align-items-start">
									<div class="d-flex flex-column align-items-start">
										<router-link :to="{ name: 'AboutCompany', params: { id: user._id }, }" >
											<h5 class="company-name">{{ user.name }}</h5></router-link >
									</div>
									<br />
									<div class="d-flex flex-column">
										<label class="par">{{ jobAd.city }}</label>
										<label class="par">{{ jobAd.salary }}</label>
										<label class="par">{{ jobAd.expireAt | date-format }}</label>
									</div>
									
								</div>

								
							</div>
							<br />
								<div>
									
										<button @click="edit" class="btn btn-lg btn-primary rounded dugme editBtn  "><font-awesome-icon  :icon="['fas', 'edit']" /></button>
										
								</div>
						</div>
						<div class="d-flex jobAd-tags justify-content-start flex-wrap mt-3">
							<a class="m-1 px-1 border tagBg" v-for="tag in jobAd.tags" :key="tag" href="#!" >{{ tag }}</a >
						</div>
					</div>
					<div>
						<hr />
						<h4 class="text-muted">About this job</h4>
					</div>
					<div class="jobAd-description text-start">
						<p class="">
							{{ jobAd.description }}              
						</p>
					</div>
				</div>
					
				</div>
					<div v-else class="px-5 ">
					<hr />
					<h4 class="text-muted">Edit ad</h4>
						<div  class="container card mt-3 p-4 pt-2 rounded infoDiv shadow-large"> 
						
							<div class="row">
								<!-- ad name -->
								<div class="col-4 d-flex flex-column align-items-start">
									<label for="name" class="form-check-label px-1">Ime:</label>
									<input type="text" class="form-control rounded inputPolje my-1" v-model.trim="jobAd.name" name="name"   autofocus=""  />
								</div>
								<!-- ad city  -->
								<div class="col-4 d-flex flex-column align-items-start">
									<label for="city" class="form-check-label px-1">Grad:</label>
									<input type="text" class="form-control  rounded inputPolje my-1" v-model.trim="jobAd.city" name="city"  autofocus="" />
								</div>
								<!-- time expires -->
								<div class="col-4 d-flex flex-column align-items-start">
									<label for="time" class="form-check-label px-1" >Rok za prijavu:</label>
									<input type="date" class="form-control rounded inputPolje my-1" v-model.trim="jobAd.expireAt" name="timeExpires" autofocus="" />
								</div>
							</div>
							<div class="row">
								<!-- salary -->
								<div class="col-4 d-flex flex-column align-items-start">
									<label for="salary" class="form-check-label px-1">Plata:</label>
									<input type="text" class="form-control rounded inputPolje my-1" v-model.trim="jobAd.salary" name="salary" autofocus="" /> 
								</div>
								<!-- tags -->
								<div class="col-4 d-flex flex-column align-items-start">
									<label for="tags" class="form-check-label px-1">Tag: </label>
									<input type="text" class="form-control rounded inputPolje my-1" v-model.trim="tags" name="tags" autofocus=""  />
								</div>
								<div class="col-4 d-flex flex-column align-items-start justify-content-end " >
									<button @click="addTag" class="btn btn-lg btn-primary rounded dugme" > Dodaj tag</button>
								</div>
							</div>
							<div class="row">
								<div class="col-12 d-flex flex-column align-items-start">
									<label for="time" class="form-check-label px-1">Tagovi:</label>
									<div class="col-12 d-flex flex-row flex-wrap">
										<div v-for="tag in this.jobAd.tags" :key="tag" class="col-2 container boja  d-flex flex-row p-2  align-items-start justify-content-between card rounded" >
											<label for="tag" class="form-check-label px-1">{{tag}}</label>
											<button @click="deleteTag(tag)" class="btn btn-sm btn-danger rounded">X</button>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 d-flex flex-column align-items-start">
									<label for="description" class="form-check-label px-1" >Description:</label>
									<textarea class="form-control rounded col-9 inputPolje my-1" name="description" v-model="jobAd.description" 
										placeholder="Company description" maxlength="1000" rows="5" autoofocus required >
									</textarea>
								</div>
							</div>
							<div class="d-flex justify-content-center">		
								<button @click="edit" class="btn btn-lg m-4 btn-info rounded dugme editBtn  ">Cancel</button>
								<button @click="updateAd" class="btn btn-lg m-4 btn-primary rounded dugme" >Save</button>
								<button @click="deleteAd" class="btn btn-lg m-4 btn-warning rounded dugme" >Delete ad</button>
						</div>
						</div>
						
				</div>			 
			</div>
			<div v-else>
				<AppSpinner />
			</div>
			<hr class="mx-5" />	
		<h4 class="text-muted">Job candidates</h4>
		<CandidateInfo v-for="candidate in candidates" :key="candidate.userID" :candidate="candidate" />		
		<div class="row">
			<Footer class="relative-bottom" />
		</div>
		</div>				
	</div>	
	
	
</template>

<script>
import Vue from "vue";
import Header from "../components/Header.vue";
import CompanyHeader from '../components/CompanyHeader.vue'
import Footer from "../components/Footer.vue";
import AppSpinner from "../components/AppSpinner.vue";
import CandidateInfo from "../components/CandidateInfo.vue"


export default {
	title: "IT Da Radis - Homepage",
	components: {    
		AppSpinner,
		Header,
		Footer,
		CompanyHeader,
		CandidateInfo
	},
	data() {
		return {
			isDataLoaded: false,
			userType: null,
			jobAd: null,      
			user: null,   
			imageUrl: "",
			editable: false,
			tags: null,
		};
	},
	computed:{
		candidates(){
			return this.$store.getters['getCandidatesForJobAd']
		}
	},
	methods: {    
		async getUser() {
			let id = Vue.$cookies.get("id");
			await this.$store.dispatch("getCompanyByID", id);
			this.user = this.$store.getters["getCurrentCompany"];
		}, 
		edit() { 
				this.editable = !this.editable               
		},
		addTag() {
	
      if (this.tags == null || this.tags == "") {
        Vue.toasted.show("Polje za tag mora biti popunjeno.", {
          theme: "bubble",
          position: "top-center",
          duration: 2000,
        });
      } else if (this.jobAd.tags.indexOf(this.tags) >= 0) {
				this.jobAd.tags.indexOf(this.tags)
        Vue.toasted.show("Taj tag ste vec uneli.", {
          theme: "bubble",
          position: "top-center",
          duration: 2000,
        });
      }
      else { 

        this.jobAd.tags.push(this.tags);
      }
    },
		deleteTag(tag){
			this.jobAd.tags.pop(tag);
		},
		async updateAd(){
			await this.$store.dispatch(`updateAd`,this.jobAd)
			this.editable = !this.editable
		},
		async deleteAd(){
			await this.$store.dispatch(`deleteAd`,this.jobAd._id)
		}
	},
	async created() {
		this.userType = Vue.$cookies.get("userType");
		this.isDataLoaded = false;
		let id = this.$route.params.id;
		await this.$store.dispatch("getJobAdByID", id);
		this.jobAd = this.$store.getters["getCurrentJobAd"];
		await this.$store.dispatch("getCompanyByID", this.jobAd.companyID);
		this.user = this.$store.getters["getCurrentCompany"];
		await this.$store.dispatch("getCandidatesForJobAd", this.jobAd._id)
		this.isDataLoaded = true;
		if(this.user.image != null){
			// const url = btoa(String.fromCharCode.apply(null, new Uint8Array(this.user.image.img.data.data)))
			const url = btoa(new Uint8Array(this.company.image.img.data.data).reduce(function(data,byte) { 
				return data + String.fromCharCode(byte);
			}, ''))
			this.imageUrl = `data:${this.user.image.img.contentType};base64,${url}`
		}
	},
	
};
</script>

<style scoped>
.logo {
	width: 10rem;
	height: 10rem;
	border-radius: 2rem !important;
}
.rounded {
	border-radius: 10px !important;
}

.mainDiv {
	padding: 0;
	margin: 0;
	overflow-x: hidden;
	background-color: whitesmoke;
}
.link {
	color: #5d6bf6;
	font-size: 14px;
	font-weight: 550;
	letter-spacing: 0;
	line-height: 18px;
	text-decoration: none;
	cursor: pointer;
}
.textColor {
	color: #2c3e50;
}
.par {
	font-size: 14px;
	color: #2c3e50;
	font-weight: 550;
	letter-spacing: 0;
	line-height: 18px;
	text-decoration: none;
	cursor: default;
}
.link:hover {
	text-decoration: underline;
}
.dugme {
	margin: top 0.8rem;
	margin-bottom: 0.8rem;
	background-color: #00b1a8;
	color: white;
	outline: none;
	font-weight: 600;
}
.dugme:hover {
	background-color: hsl(177, 100%, 20%);
}

.tagBg {
	font-weight: 550;
	letter-spacing: 0;
	border-radius: 2px;
	background-color: #f4f5f9;
	color: #8b8b9f;
	font-size: 1rem;
	border-color: transparent !important;
}
.tagBg:hover {
	background-color: hsl(240, 1%, 78%);
	transition: 0.25s;
}
@media (max-width: 576px) {
	.jobAd-info-basic {
		display: flex !important;
		flex-direction: column !important;
	}
	.jobAd {
		margin: 2rem !important;
		padding: 2rem !important;
	}
	.company-name {
		align-self: center !important;
		display: flex !important;
	}
}
</style> 