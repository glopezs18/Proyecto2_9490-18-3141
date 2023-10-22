import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

const AdminCardSection = (props: any) => {
  return (
    <MDBRow className="mb-4">
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color"/>
                <div className="data">
                  <p>Ingresos</p>
                  <h4>
                    <strong>Q{props.saleTotalInfo}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div ria-valuemax={100} aria-valuemin={0} aria-valuenow={25} className="progress-bar bg-primary" role="progressbar"
                    style={{width: '25%'}}></div>
                </div>
                <MDBCardText>Mejor de un 25%</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-line" className="warning-color"/>
                <div className="data">
                  <p>Ventas</p>
                  <h4>
                    <strong>{props.salesLength}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div ria-valuemax={100} aria-valuemin={0} aria-valuenow={25} className="progress-bar bg grey" role="progressbar"
                    style={{width: '25%'}}></div>
                </div>
                <MDBCardText>Worse than last week (25%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
        <MDBCol xl="4" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="chart-pie" className="light-blue lighten-1"/>
                <div className="data">
                  <p>Productos</p>
                  <h4>
                    <strong>{props.productsLength}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div ria-valuemax={100} aria-valuemin={0} aria-valuenow={25} className="progress-bar grey darken-2" role="progressbar"
                    style={{width: '75%'}}></div>
                </div>
                <MDBCardText>Worse than last week (75%)</MDBCardText>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>        
      </MDBRow>
  )
}

export default AdminCardSection;

