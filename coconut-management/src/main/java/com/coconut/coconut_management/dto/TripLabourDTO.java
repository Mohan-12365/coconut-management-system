
package com.coconut.coconut_management.dto;

public class TripLabourDTO {

    private String name;
    private String phone;
    private Double wage;
    private Boolean driver;

    public TripLabourDTO(String name, String phone, double wage, boolean driver) {
        this.name = name;
        this.phone = phone;
        this.wage = wage;
        this.driver = driver;
    }

    // getters
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public double getWage() { return wage; }
    public boolean isDriver() { return driver; }
}
