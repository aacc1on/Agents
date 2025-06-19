-- Active: 1750017276084@@127.0.0.1@5432@spybase
-- agents աղյուսակ
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    codename TEXT UNIQUE NOT NULL,
    real_name TEXT NOT NULL,  -- կպահպանվի գաղտնագրված տեսքով
    clearance_level INTEGER CHECK (clearance_level >= 1 AND clearance_level <= 10)
);

-- missions աղյուսակ
CREATE TABLE missions (    
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('assigned', 'active', 'failed', 'completed')),
    location TEXT,
    agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
    start_date DATE,
    end_date DATE
);

-- mission_files աղյուսակ
CREATE TABLE mission_files ( 
    id SERIAL PRIMARY KEY,
    mission_id INTEGER REFERENCES missions(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    encrypted_data TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#for run

#psql -U  postgres -d spybase -f init/init.sql